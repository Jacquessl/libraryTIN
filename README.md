# libraryTIN
security:<br>
all:<br>
-login<br>
-kategorie<br>
-rejestracja<br>
-pobieranie książek<br>
authenticated:<br>
-editUser<br>
-changeUserPassword<br>
-makeBookReservation<br>
-deleteUser<br>
librarian or manager:<br>
-all<br>
start:<br>
-create MySql db from createDB.sql<br>
db settings:<br>
url=jdbc:mysql://localhost:3306/LibraryDB?useSSL=false&allowPublicKeyRetrieval=true&characterEncoding=UTF-8<br>
username=root<br>
password=password<br>
-backend: start<br>
-frontend: npm start