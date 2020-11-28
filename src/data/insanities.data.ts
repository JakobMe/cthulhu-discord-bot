import { DataEntry } from '../interfaces/data-entry.interface';

export interface Insanities {
  kurz: DataEntry[];
  lang: DataEntry[];
}

export const insanities: Insanities = {
  kurz: [
    {
      title: 'Amnesie',
      description:
        'Der Investigator hat keine Erinnerung mehr an die Geschehnisse, die sich seit seinem letzten Aufenthalt an einem einigermaßen sicheren Ort zugetragen haben. Im einen Moment scheint er noch friedlich seinen Morgenkaffee umgerührt zu haben, im nächsten steht er Auge in Auge mit einem grauenhaften Ungeheuer. Nach `{{duration}} Runde(n)` schließt sich diese Gedächtnislücke jedoch wieder.'
    },
    {
      title: 'Psychosomatisches Gebrechen',
      description:
        'Rein psychosomatisch bedingt erblindet der Investigator plötzlich, ertaubt oder kann eine oder mehrere Gliedmaßen nicht mehr bewegen – jeweils `{{duration}} Runde(n)` lang.'
    },
    {
      title: 'Raserei',
      description:
        'Ein roter Nebel senkt sich vor den Blick des Investigators, und er verfällt in unkontrollierte, gewalttätige Raserei, in der er `{{duration}} Runde(n)` lang ringsum alles kurz und klein zu schlagen sucht, ob Freund oder Feind.'
    },
    {
      title: 'Verfolgungswahn',
      description:
        'Der Investigator leidet `{{duration}} Runde(n)` lang unter heftigem Verfolgungswahn – alle haben es auf ihn abgesehen; es gibt niemanden, dem er vertrauen kann; er wird ab- oder ausgehorcht; jemand hat ihn verraten; die Dinge sind nicht, wie sie zu sein scheinen.'
    },
    {
      title: 'Wichtige Person',
      description:
        'Der Investigator hält jemand anderen in seiner unmittelbaren Umgebung für eine der wichtigen Personen, die in seinem Hintergrund aufgeführt ist, und beträgt sich `{{duration}} Runde(n)` lang entsprechend.'
    },
    {
      title: 'Ohnmacht',
      description:
        'Der Investigator fällt in Ohnmacht und bleibt `{{duration}} Runde(n)` lang besinnungslos.'
    },
    {
      title: 'Panische Flucht',
      description:
        'Der Investigator will so schnell wie möglich so weit weg wie möglich gelangen, selbst wenn das bedeutet, dass er sich das einzige Fahrzeug der Gruppe schnappt und alle andern schnöde im Stich lässt. Nach `{{duration}} Runde(n)` kann er wieder an anderes denken.'
    },
    {
      title: 'Hysterischer Anfall oder Gefühlsausbruch',
      description:
        'Der Investigator muss `{{duration}} Runde(n)` lang unkontrollierbar lachen, weinen, schreien o. ä.'
    },
    {
      title: 'Phobie',
      description:
        'Der Investigator entwickelt eine neue Phobie. Diese wird entweder vom Spielleiter oder durch einen Wurf mit 1W100 auf Tabelle IX: Ausgewählte Phobien bestimmt. Auch wenn der Auslöser der Phobie in der augenblicklichen Situation gar nicht vorhanden ist, bildet sich der Investigator `{{duration}} Runde(n)` lang ein, dies sei der Fall.'
    },
    {
      title: 'Zwangsstörung',
      description:
        'Der Investigator entwickelt eine neue Zwangsstörung. Diese wird entweder vom Spielleiter oder durch einen Wurf mit 1W100 auf Tabelle X: Ausgewählte Zwangsstörungen bestimmt. `{{duration}} Runde(n)` lang versucht der Investigator, dieser Zwangsvorstellung nachzukommen'
    }
  ],
  lang: [
    {
      title: 'Gedächtnisverlust (Amnesie)',
      description:
        'Ohne Erinnerung daran, wer er eigentlich ist, kommt der Investigator wieder zu Sinnen – an einem Ort, den er erst recht nicht kennt. Nur langsam wird die Erinnerung zurückkehren.'
    },
    {
      title: 'Ausgeraubt',
      description:
        '`{{duration}} Stunde(n)` später kommt der Investigator wieder zu Sinnen und muss feststellen, dass er selbst zwar unverletzt ist, aber beraubt wurde. Hatte er einen Gegenstand bei sich, der in seinem Hintergrund als „Gehüteter Besitz“ aufgeführt ist, befindet sich dieser noch in seinem Besitz, sofern ihm ein Glückswurf gelingt. Alle anderen Wertgegenstände sind automatisch verloren.'
    },
    {
      title: 'Übel zugerichtet',
      description:
        'Der Investigator kommt nach `{{duration}} Stunde(n)` wieder zu sich und ist körperlich übel zugerichtet. Er hat nur noch die Hälfte der Trefferpunkte, die er hatte, als ihn der Anfall ereilte; allerdings keine Schwere Wunde. Er wurde nicht ausgeraubt. Wie der Investigator den Schaden erlitten hat, bestimmt der Spielleiter.'
    },
    {
      title: 'Gewalttätig',
      description:
        'Der Investigator verfällt für `{{duration}} Stunde(n)` in rasende Gewalttätigkeit; ob er sich daran erinnert oder ob in seiner Umgebung irgendwelche Spuren davon zu erkennen sind, wenn er wieder zu sich kommt, liegt ebenso in der Hand des Spielleiters wie die Antwort auf die Frage, woran er seine Raserei abreagiert hat, was er zerstört, wen er verletzt, verwundet oder gar getötet hat.'
    },
    {
      title: 'Glaube/Weltsicht',
      description:
        'Eine der Eintragungen zu „Glaube/Weltsicht“ aus dem Hintergrund des Investigators wechselt über in eine extreme, fanatische, übertriebene, exaltierte oder besonders augenfällige Ausprägung. So könnte man etwa einen religiösen Investigator später (innerhalb von `{{duration}} Stunde(n)`) in der U-Bahn entdecken, wo er das Evangelium predigt.'
    },
    {
      title: 'Wichtige Person',
      description:
        'In der Zeit bis zum Abklingen seines Anfalls (`{{duration}} Stunde(n)` oder länger) tut der Investigator sein Möglichstes, um zu einer der „wichtigen Personen“ aus seinem Hintergrund zu gelangen und gemäß dessen zu handeln, weswegen diese Person so wichtig für ihn ist.'
    },
    {
      title: 'In Verwahrung',
      description:
        'Als der Investigator nach `{{duration}} Stunde(n)` zu Sinnen kommt, befindet er sich in der Obhut entweder der Polizei oder einer Nervenheilanstalt. Ganz allmählich wird er sich auch wieder daran erinnern, wie er dorthin kam.'
    },
    {
      title: 'Panische Flucht',
      description:
        'Als der Investigator nach `{{duration}} Stunde(n)` wieder zu Sinnen kommt, ist er irgendwo weit weg, etwa an einem unwegsamen, unbekannten Ort fernab der Zivilisation draußen in den Wäldern oder in einem Überlandbus.'
    },
    {
      title: 'Phobie',
      description:
        'Der Investigator entwickelt eine Angstvorstellung, die entweder vom Spielleiter bestimmt wird oder durch einen Wurf mit 1W100 auf Tabelle IX: Ausgewählte Phobien. Nach `{{duration}} Stunde(n)` kommt der Investigator wieder zu Sinnen und hat in der Zwischenzeit alle erdenklichen Maßnahmen getroffen, um nicht auf den Gegenstand seiner Phobie treffen zu müssen.'
    },
    {
      title: 'Zwangsstörung',
      description:
        'Der Investigator entwickelt eine Zwangsstörung. Diese wird entweder vom Spielleiter bestimmt oder durch einen Wurf mit 1W100 auf Tabelle X: Ausgewählte Zwangsstörungen. Bis der Investigator `{{duration}} Stunde(n)` später wieder zu Sinnen kommt, frönt er ausschließlich seiner neuen Zwangsvorstellung. Ob das auch für Außenstehende ersichtlich ist, bleibt Spieler und Spielleiter überlassen'
    }
  ]
};
