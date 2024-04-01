# Skoluppgift - Bank-app utan databas och vettig hantering av token samt HTTP och inte HTTPS

- sessionStorage används för att lagra token för varje session.
- HTTP (**_ej HTTPS_**)

### TODO:
- Lägga till olika bakgrundsbilder på resterande sidor utöver Hero
- Ev. designa hela sidan

#### NOTE:

Vill man testköra på en EC2 (AWS) instans kan följande kommando underlätta livet en aning. Det byter ut alla localhost i fetch anrop mot adressen på din EC2 instans.

Använder `find` och `sed` för att byta ut alla `localhost` mot den rätta adressen från AWS instansen. Detta kommando söker igenom alla filer (endast filer), i current working dir, där filnamnet är `page.js`, sen körs sed som ersätter alla förekomster av localhost med `address-till-aws-backend`.
När flaggan **_-i_** används görs ändringar direkt i filerna utan att skapa en säkerhetskopia.

```
find . -type f -name "page.js" -exec sed -i 's|localhost|ec2-adressen|g' {} +

```

**_OBS!_** <i>Jag använde "\*.js" istället för "page.js". Då editeras alla filer med filändelsen .js.
Jag anväde också en längre sträng både på ordet och ersättningsordet:
's|http://localhost:3001|http://ec2-adressen:3001|g'
Det fungerade för mig. Men både port och http:// är densamma lokalt och på EC2 så jag tänkte att det var överflödigt och har "komprimerat" kommandot efter det.</i>