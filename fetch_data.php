<?php
require "connection.php";

// Query your table
$sql = "SELECT * FROM target_requirements";
$result = $conn->query($sql);

// Create an array to store the result
$data = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

// Return data as JSON
echo json_encode($data);

// Close the connection
$conn->close();
?>
