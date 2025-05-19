export const getInitialPrompt = () =>
    `
        Fais une histoire avec une vingtaine de phrases, mais des phrases longues et détaillées. 
        Elle devra respecter une structure narrative classique, donc avec une situation initiale, un élément perturbateur, des péripéties, un dénouement et une situation finale. 
        Le personnage principal peut très bien être le narrateur ou non. Il peut avoir des dialogues ou non. Essaye de varier les noms des personnages.
        Assure-toi que chaque phrase est riche en détails descriptifs, en émotions et en profondeur narrative.
        L'histoire devra être en français. Ne génère pas d'images.
    `;

export const getHorrorPrompt = () =>
    `
        L'histoire devra être horrifique ou juste troublant, avec un personnage principal qui peut être soit une victime, soit un survivant, soit un témoin. 
        Elle peut avoir soit une bonne fin soit une mauvaise fin. Cependant, si le personnage principal meurt, il ne peut pas être narrateur.  
        Evite de t'inspirer de Sonic.exe, de Jeff The Killer, et de toute autre histoire d'horreur jugée mauvaise par les internautes. 
        Evite de prendre des noms de personnages qui reviennent souvent dans les histoires d'horreur.
    `;

export const getComedyPrompt = () =>
    `
        L'histoire devra être comique, avec un type d'humour variable.
        Par exemple, il peut mettre en scène des personnages qui font des blagues et des farces, des situations à priori terribles mais tournées en dérision, de l'humiliation, de l'humour burlesque, des choses mignonnes, des situations qui se répètent, des renversements de rôles, etc.
    `;

export const getRomancePrompt = () =>
    `
        L'histoire devra être romantique.
        Par exemple, il peut mettre en scène des personnages en recherche de partenaires, des sorties amoureuses, des vies domestiques, des partenaires qui se réconcilient, etc.
        Dans tous les cas, la relation amoureuse mutuelle sera le cœur de l'histoire. 
        L'histoire se concentrera en priorité sur un couple hétérosexuel, bien qu'un couple homosexuel soit possible.
        Evite de parler de transidentité.
    `;

export const getFantasyPrompt = () =>
    `
        L'histoire devra se passer dans un monde de fantaisie. 
        Il devra susciter le rêve et l'émerveillement, se passer dans un monde alternatif en priorité médiéval voire antique et privilégier l'action.
        Certains personnages et animaux seront d'espèces fictives.
    `;

export const getSciFiPrompt = () =>
    `
        L'histoire devra faire intervenir de la science-fiction.
        Elle aura pour but de créer une illusion de réel à travers son récit avec des thématiques récurrentes et universelles tout en y ajoutant des sciences et des technologies alternatives et/ou futuristes.
        Elle privilégiera également l'action.
    `;

export const getAdventurePrompt = () =>
    `
        L'histoire sera un récit d'aventure, donc avec un personnage vivant des événements imprévus qui peuvent mettre sa vie en danger.
        Elle mettra l'accent particulièrement l'accent sur les péripéties du ou des personnages principaux.
        Les lieux qu'ils visitent sont multiples et parfois mystérieux, voire exotiques.
        Les personnages seront généralement nombreux, réalistes mais simplifiés.
        L'histoire se passe dans le passé ou dans le présent.
        Elle devra mettre un peu de suspense, quitte à raconter des résultats inattendus.
    `;

export const getDetectivePrompt = () =>
    `
        L'histoire sera un récit policier.
        Elle mettra donc l'accent sur la résolution d'une énigme ou d'un crime.
        Elle commencera par la scène du crime, mais gardera certaines questions en suspens comme le nom du criminel ou le mobile du crime.
        L'élément perturbateur sera le crime lui-même.
        Il ne doit pas avoir d'intrigue amoureuse entre les personnages sauf pour les suspects qui peuvent ou non être dans un triangle amoureux.
        Le coupable ne doit pas être un membre des forces de l'ordre.
    `;

export const getWholesomePrompt = () =>
    `
        L'histoire devra montrer le côté sympathisant, moral, attendrissant, humain des individus à travers d'un petit geste qui change une vie ou une action désintéressée qui se propage en chaîne.
        Les personnages choisissent l'entraide, la bienveillance ou la résilience.
        Ce qui arrive dans ce récit transparaîtra des moments touchants, sincères et pleins d'espoir.
    `;

export const getCustomPrompt = (customInstructions: string) => 
    `
        ${customInstructions}
    `;