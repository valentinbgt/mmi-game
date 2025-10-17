---
title: Nouveaux prototypes et Création d'un Scène Loader
authors: [valentin, audric, gabriel, marius]
---

## Valentin

Optimisation de la CI/CD pour un déploiement en production plus rapide du site web.

![optimisation CI/CD](/img/monsieur-glace.png)

Cette dernière était hébergée sur mon site mon VPS, j'ai fait en sorte que le déploiement et le host soient sur mon serveur. Le VPS était trop lent et n'avait pas assez de place pour supporter la charge

Implémentation de la logique pour le retour menu :

- Appui du bouton échap (correspondant au bouton blanc sur la borne)
- Système d'anti afk, nous ramenant au menu au bout de 200 secondes.

![optimisation CI/CD](/img/back-menu.png)

Bug des listeners audio multiples réglé. Ces derniers se créaient en masse dans une scène lors du lancement de manière dynamique

J'ai donc créé des fonctions qui s'assurent qu'il n'y en ait juste un.

## Audric

Avec Valentin : Création du Loader de minijeu (code ci-dessous) :

```csharp title="ScenesLoader.cd"
using UnityEngine;
using UnityEngine.SceneManagement;
using System.Collections;

public class ScenesLoader : MonoBehaviour
{
    // [SerializeField] private GameObject sceneContainer;
    public GameObject sceneContainer; // Ton GameObject vide
    public Vector3 targetScale = new Vector3(0.5f, 0.5f, 1f);

    private bool SceneLoaded = false;

    public void LoadMiniGame(string sceneName)
    {
        StartCoroutine(LoadMiniGameCoroutine(sceneName));
    }

    IEnumerator LoadMiniGameCoroutine(string sceneName)
    {
        // Charge la scène additive
        AsyncOperation asyncLoad = SceneManager.LoadSceneAsync(sceneName, LoadSceneMode.Additive);
        while (!asyncLoad.isDone)
            yield return null;

        // Récupère la scène
        Scene miniScene = SceneManager.GetSceneByName(sceneName);

        // Parent tous les objets racines au container
        foreach (GameObject go in miniScene.GetRootGameObjects())
        {
            if (go.name == "Main Camera")
            {
                Destroy(go);
                continue;
            }
            ; // Ignore la caméra principale
            go.transform.SetParent(sceneContainer.transform, false);
        }
        sceneContainer.transform.localScale = new Vector3(0.5f, 0.5f, 1f);
    }

    public void UnloadMiniGame(string sceneName)
    {
        SceneManager.UnloadSceneAsync(sceneName);
        foreach (Transform child in sceneContainer.transform)
        {
            Destroy(child.gameObject);
        }
    }
}

```

Intégration dans le GameManager + Récupération et affichage random des jeux (code ci-dessous) :

```csharp title="GameManager.cd"
private string GetRandomGame()
{
string[] scenesList = Directory.GetFiles("Assets/Scenes/MiniGames", "\*.unity");
for (int i = 0; i < scenesList.Length; i++)
{
scenesList[i] = Path.GetFileNameWithoutExtension(scenesList[i]);
}

        System.Random rand = new System.Random();
        int index = rand.Next(scenesList.Length);

        if (currentGame == scenesList[index])
        {
            index = (index + 1) % scenesList.Length;
        }

        return scenesList[index];

    }

if (Input.GetButtonDown("P1_B6"))
{
string nextGame = GetRandomGame(); //ou alors le jeu que vous voulez tester comme ça : nextGame = "SlotMachine";
scenesLoader.LoadMiniGame(nextGame);
currentGame = nextGame;
}
if (Input.GetButtonDown("P1_B3"))
{
if (currentGame != "")
{
scenesLoader.UnloadMiniGame(currentGame);
}
}
```

## Gabriel

Faire en sorte que mes mini-jeux aient le bon système de timer.

Réglage d'un bug qui lançait le timer et certaines logiques de MentalMath à l'allumage du jeu et non pas au load de la scène de MentalMath.

Je commence la réalisation d'assets graphiques pour un mini jeu pour Valentin (celui de la bouteille de champagne)

## Marius

Mise à jour du site Blog et ésthétique de ce dernier, ajout d'un logo + Création en cours d'un nouveau jeu `Taiko`

Ce dernier, en ajoutant une musique dans un fichier grâce à un algo, créera deux types de boules de couleurs qui passeront de gauche à droite et qui devront être cliqué à un instant t.

![setup unity](/img/taikosetup.png)

En fonction de la précision de la pression, retour visuel.

![retour visuel sur la précision d'un click](/img/hitresult-taiko.png)

Il y a aussi un facteur de difficulté qui sera en accord avec un facteur de difficulté défini au début de la partie.
