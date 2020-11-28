so funktioniert der Befehl `probe` :dart:
```console
> !probe <fertigkeitswert> [optionen] ["kommentar"]

Würfelt eine W100-Probe auf den angegebenen (vollen) Fertigkeitswert zwischen 1 und 100 und gibt die Erfolgsstufe der Probe aus. Zusätzlich können bis zu 5 Bonus- oder Strafwürfel angegeben werden.

Optionen:

  !bonus <n>    N Bonuswürfel hinzufügen
  !malus <n>    N Strafwürfel hinzufügen

Beispiele:

> !probe 70                # Probe auf 70
> !probe 25 "Überreden"    # Probe auf 25 mit Kommentar
> !probe 40 !bonus 1       # Probe auf 40 mit 1 Bonuswürfel
> !probe 85 !malus 2       # Probe auf 85 mit 2 Strafwürfeln
```