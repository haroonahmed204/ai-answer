<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Extension Interface</title>
  <!-- CSS -->
  <link rel="stylesheet" href="styles.css">
</head>
</head>

<body>
  <header>
    <nav>
      <h1>AI Answer</h1>

      <div class="dropdown">
        <button class="dropbtn">Menu</button>
        <div class="dropdown-content">
          <button type="button" id="getText">Get Page Text</button>
          <button type="button" id="fetchDB">Fetch From Database</button>
        </div>
      </div>
    </nav>
  </header>

  <main>
    <form action="">
      <select name="users" id="userSelect">
        <option value="">Select a user</option> <!-- Initial empty option -->
      </select>
      
    </form><br>
    <textarea id="w3review" name="w3review" rows="8" cols="50"></textarea>
    <div id="users-list"></div>
    <button type="Answer">Answer</button>
  </main>
  <!-- custom script -->
  <script src="script.js"></script>
  
</body>

</html>