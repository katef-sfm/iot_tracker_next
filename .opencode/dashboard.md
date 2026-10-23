l'objectif est de créer un dashboard de monotiring des capteurs iot sous forme d'une application web frontend en nextjs et tailwindcss 

les outils techniques

- bun
- nextjs
- typescript
- https://lightningchart.com
- https://chartkit.dev - https://chartkit.dev/demo
- https://www.creative-tim.com/learning-lab/tailwind/nextjs/quick-start/notus
- axios

la docs api swagger : http://iot-tracker.duo.cloud/api/docs

les pages a implmenter :

- page home
- login
- register
- reset password
- dashboard
  - affiche les differents devices presenté sur l'api
- sites
- boxes
- devices
  - infos
  - chart graphique sous forme lines qui permet de lister les differents mesures pris pour une duréee precis (par defaut on affiche les valeurs de derniers 24h [24h / 48h / 72h / 1semaine / 2 semaines / 1mois]
  - on utilise pour les charts le plugin lightningchart
  -
