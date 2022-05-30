let chooseColor = document.getElementsByTagName("option");
 for (let i = 0; i < product.colors.length; i++) {
 let option = document.createElement("option");
 option.innerText = product.colors[i];
 chooseColor.appendChild(option);
 }



 
























 let allColors = article.colors;

 for (indexColors = 0; indexColors < allColors; indexColors++) { 
     
 } 

 let articlesRawData = {
   altTxt: article.altTxt,
   colors: (allColors.length) [allColors[indexColors]],
   description: article.description,
   imageUrl: article.imageUrl,
   name: article.name,
   price: article.price,
   _id: article._id

 }

 let articlesDataForStorage = JSON.stringify(articlesRawData);

 let storeData = function () {
   localStorage.removeItem("articlesDataForStorage")
  
 }
 
 storeData();

















