$(document).ready(function(){
  var tabledata;
    $.ajax({ 
        type: "GET",
        dataType: "json",
        url: "http://localhost:3000/allbooks",
        success: function(data){        
        if(data.length==0)
        {
          $('#bookstable').append(`<tr>
          <th>Book name</th>
          <th>Author</th>
          <th>Category</th>
          <th>Action</th>
          </tr>
          <tr><td colspan="4">No book to show</td></tr>`);
        }else{
           tabledata =`<tr>
          <th>Book name</th>
          <th>Author</th>
          <th>Category</th>
          <th>Action</th>
        </tr>`;
        for(var i = 0; i<data.length; i++){
          tabledata +=`<tr>
          <td>${data[i].title}</td>
          <td>${data[i].author}</td>
          <td>${data[i].category}</td>
          <td>
                <button type="button" class="btn btn-secondary btn-success" value="${data[i]._id}">Edit</button>
                <button type="button" class="btn btn-secondary btn-danger" value="${data[i]._id}">Delete</button>
          </td>
        </tr>`
        }
      }
         $('#bookstable').append(tabledata);
        }
     });

     //Add button function

     $('#addbtn').on('click',function(e){
        window.location.href= 'http://localhost:3000/add.html';
     });

     $('#btnsmt').on('click',function(e){
      var data = {
        title:$('#booktitle').val(),
        author: $('#bookauthor').val(),
        category:$('#bookcategory').val() 
      }
     
     $.ajax({
        type: 'POST',
        url: "http://localhost:3000/addbook",
        data: data,
        dataType: "jsonp",
        success: function(resultData) { alert(resultData) },
        
  });
  


     });
});