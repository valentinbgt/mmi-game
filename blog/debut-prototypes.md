---
title: Initialisation du projet et début des prototypes
authors: [valentin, audric, gabriel, marius]
---

## Valentin

J'ai mis le site web en production sur mon VPS.

Nous voulions directement pouvoir déployer le site avec un push sur le [repository Github](https://github.com/valentinbgt/mmi-game/).

Nous utilisons Docusaurus, l'équivalent d'un Gitbook.

La problématique avec ce dernier est qu'il a quelques exigences concernant son déploiement.

Ce dernier doit être `npm install` et build `npm run build`.

![cicd](/img/cicd.png)

Pour tout le processus de déploiement, j'utilise n8n

```yaml title="ci.yml"
name: CI/CD call n8n auto deploy

on:
push:
branches: - main
pull_request:

jobs:
build-and-test:
runs-on: ubuntu-latest

    steps:
      - name: Trigger n8n webhook
        run: curl -fsSL "https://n8n.beauget.fr/webhook/d81232cf-0467-4dd0-9d23-2d52acc5cabf"

```

J'ai également réalisé un premier prototype : 'SlotMachine' où l'utilisateur observe une roulette avec 3 slots faisant défiler des fruits et doit appuyer 3 fois d'affilée à un moment précis lorsqu'un 7 apparaît pour réussir le mini-jeu.

![7](/img/sevenSlotMachine.png)

## Gabriel

Je me suis occupé de créer une bonne base que ce soit dans la hiérarchisation des éléments du jeu ou dans les méthodes communes réutilisables par tous les autres dans la création des mini-jeux (GameManager).

```csharp title="GameManager.cs"
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;
using System;

public class GameManager : MonoBehaviour
{
    [Header("Config Initiale")]
    [SerializeField] public int startingLives = 2;
    [SerializeField] public int difficulty = 1;
    [SerializeField] private int lives;
    public int Lives { get; private set; }

    [Header("Timer Partagé")]
    [SerializeField] private bool timerRunning;
    public bool TimerRunning { get; private set; }
    [SerializeField] private float remainingTime;
    public float RemainingTime { get; private set; }
    [SerializeField] private float duration;
    public float Duration { get; private set; }
    private Coroutine _timerCo;
    public event Action OnTimerEnded;
    public event Action<float> OnTimerTick;

    [Header("Leaderboard")]
    [SerializeField] private int roundsPlayed;
    public int RoundsPlayed { get; private set; }

    [Header("UI")]
    [SerializeField] public TimerUI timerUI;
    [SerializeField] private LivesUI livesUI;

    //ACTION À EFFECTUER À LA FIN D'UN MINI-JEU
    public event Action OnMinigameWon;
    public event Action OnMinigameFailed;

    void Awake()
    {
        Lives = startingLives;
        livesUI?.SetLives(Lives);
        RoundsPlayed = 0;
    }

    public void AddRound()
    {
        RoundsPlayed++;
        //ON POURRA RAJOUTER D'AUTRES ACTIONS AU CHANGEMENT DE ROUND ICI
    }

    //GESTION DES VIES
    public void LoseLife()
    {
        Lives--;
        livesUI?.SetLives(Lives);
    }

    public void ResetLives()
    {
        Lives = startingLives;
        livesUI?.SetLives(Lives);
    }

    //GESTION DU TIMER
    public void StartTimer(float seconds)
    {
        StopTimer(); //pour être sur qu'on en a pas deux qui tournent
        Duration = Mathf.Max(0f, seconds);
        RemainingTime = Duration;
        TimerRunning = true;
        timerUI?.Show(Duration);
        _timerCo = StartCoroutine(CoTimer());
    }

    public void StopTimer()
    {
        if (_timerCo != null) StopCoroutine(_timerCo);
        _timerCo = null;
        TimerRunning = false;
        timerUI?.Hide();
    }

    IEnumerator CoTimer()
    {
        while (RemainingTime > 0f)
        {
            RemainingTime -= Time.deltaTime;
            if (RemainingTime < 0f) RemainingTime = 0f;
            timerUI?.UpdateTime(RemainingTime, Duration);
            OnTimerTick?.Invoke(RemainingTime);
            yield return null;
        }
        TimerRunning = false;
        OnTimerEnded?.Invoke();
    }

    //ACTIONS QUI SE LANCENT QUAND ON GAGNE OU PERD UN MINI-JEU
    public void NotifyWin()
    {
        StopTimer();
        OnMinigameWon?.Invoke();
    }

    public void NotifyFail()
    {
        StopTimer();
        OnMinigameFailed?.Invoke();
    }

    //TOUT CE QUI EST EN DESSOUS : NE PAS UTILISER - A REFACTORER SUR MON MINI-JEU
    public TMP_Text livesText;

    void Update()
    {
        livesText.text = "Vies: " + lives;
    }
}
```

J'ai également réalisé un prototype 'TriPommePoire'. Un fruit aléatoire entre ces deux apparaît à l'écran et la personne doit choisir rapidement entre le panier de gauche contenant les pommes ou celui de droite avec les poires.

![tripommepoire](/img/tripommepoire.png)

## Audric

J'ai créé l'API en Node.js pour implémenter une communication directe entre la borne et le site. En l'occurrence, le site va afficher les leaderboard.

![api leaderboard](/img/api.png)

J'ai fait un prototype en 3D d'un jeu type 'Dropper' où l'on doit ajouter les différentes balles dans les cylindres avec un bon timing.

![dropper](/img/dropper.png)

## Marius

J'ai créé le site web. On utilise docusaurus, un outil similaire à GitBook qui supporte nativement la gestion d'un blog.

J'ai commencé à créer le prototype d'un jeu 'MentalMath' qui est un jeu de calcul mental similaire à "l'Entraînement Cérébral du Dr Kawashima". Un calcul assez simple, 3 propositions, si le choix est bon, apparition d'un visage joyeux et inversement.

![Entraînement Cérébral du Dr Kawashima](/img/kawashima.jpg)

J'ai réutilisé les méthodes créées par [Gabriel](#gabriel) pour mon `CalculManager'

```csharp title="CalculManager.cd"
using UnityEngine;

public class CalculManager : MonoBehaviour
{
    [SerializeField] private GameManager gameManager;
    [SerializeField] private CalculLogic calculLogic;
    [SerializeField] private CalculUIManager calculUIManager;

    void Start()
    {
        gameManager.StartTimer(10f);
        GenerateNewCalculation();
    }

    public void GenerateNewCalculation()
    {
        var calcul = calculLogic.GenerateCalculation();
        calculUIManager.DisplayCalculation(calcul);
    }

    public bool OnAnswerSelected(int index)
    {
        bool correct = calculLogic.CheckAnswer(index);

        if (correct)
        {
            gameManager.NotifyWin();
        }
        else
        {
            gameManager.LoseLife();
            gameManager.NotifyFail();
        }

        return correct;
    }
}

```
