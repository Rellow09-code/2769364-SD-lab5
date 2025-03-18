const storage = {
    studentNo:2769364,
    books:[],
      
}

const express = require('express');
const app = express()
app.use(express.json());

const PORT = 3000;


app.get('/whoami',(req,res)=>{
    res.status(200).send({studentNo:storage.studentNo});
});

app.get('/books',(req,res)=>{
    res.status(200).send(storage.books);
});

app.get('/books/:id',(req,res)=>{
  const id = req.params.id;
  const book = storage.books.find(x => x.id == id);
  if(!book){
    res.status(400).send("invalid book id");
  }
  else{
    res.status(200).send(book);
  }
});

app.post('/books',(req,res)=>{

  const {id,title,details} = req.body;
  const book = {id,title,details};

  if(id&&title&&details){
    storage.books.push(book);
    res.status(200).send("successful");
  }

  else{
    res.status(400).send('invalid book');
  }
});

app.put('/books/:id',(req,res)=>{
  const {id,title,details} = req.body;

  if (!(id&&title&&details)){
    res.status(400).send('invalid book');
  }
  else{
    let index = 0;
    for (let book in storage.books){
      if(book.id === id){
          storage.books[index] = {id,title,details};
      }
      index = index +1;
      res.status(200).send('successful');
      return;
    }
    res.status(400).send('The book does not exist, cannot update.')
  }
})

app.delete('/books/:id',(req,res)=>{
  const {id,title,details} = req.body;

  let index = 0;
  for (let book in storage.books){
    if(book.id === id){
        storage.books.splice(index,1);
    }
    index = index +1;
    res.status(200).send('successful');
    return;
  }
})


app.listen(PORT,()=> console.log('It is alive on https://localhost:'+PORT));