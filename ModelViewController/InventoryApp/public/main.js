// Taking user's confirmation for deleting a product
// View is not aware of this file, we have to load this script into our view in layout.ejs file
function deleteProduct(id) {
  const result = confirm("Are you sure you want to delete this product?");
  if (result) {
    // Calling the deleteProduct api method and making it a post request in index.js
    fetch("delete-product/" + id, {
      method: "POST",
    }).then((res) => {
      if (res.ok) {
        location.reload();
      }
    });
  }
}
