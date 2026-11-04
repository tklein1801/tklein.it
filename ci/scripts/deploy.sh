#!/bin/bash

# Frage 0: wie kann ich dieses script auf dem Zielsystem ausführen, wenn dieses noch gar nicht dort existiert?

# Prüfe ob docker & docker compose auf dem System vorhanden ist

# Prüfen ob die benötigte Umgebungsvariable gesetzt ist
# Source: https://docs.github.com/de/packages/working-with-a-github-packages-registry/working-with-the-container-registry#authentifizierung-f%C3%BCr-die-container-registry

# In das Zielverzeichnis wechseln (erstellen sofern nicht vorhanden)

# Frage 1: wie bekomme ich die passende compose.yml
# Frage 2: wie bekomme ich meine nötigen Credentials auf das System
# Hinweis: Optional soll auch ein erstes initiales Deployment möglich sein, ohne sich auf dem System anmelden zu müssen und diese Informationen hinterlegen und anpassen zu müssen
# Hinweis: Es müssen auch Änderungen an der compose.yml möglich sein, welche gepusht werden können und dann beim Deployment anwendung finden können

# docker compose pull (pullt die images)

# docker compose up -d
