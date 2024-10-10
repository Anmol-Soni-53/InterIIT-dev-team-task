import express from 'express';
import cors from 'cors'
const app = express();
const port = 3000;
app.use(cors())

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// async function main() {
//     itemData.forEach(async (element) =>{
//         try{
//             const newItem = await prisma.item.create({
//             data: {
//                 item_id :element.item_id,
//                 name:element.name,
//                 quantity:element.quantity,
//                 category:element.category,
//                 price:element.price,
//                 status:element.status,
//                 parentGodownId:element.parentGodownId,
//                 brand:element.brand,
//                 attributes:element.attributes,
//                 image_url:element.image_url
//             }
//             });
//             console.log(newItem);
//         }
//         catch(err){
//             console.log(element);
//             console.log("already present");
//         }
//     } 

        
//     );
// }
// main()

app.get('/favicon.ico', (req, res) => {
  res.status(204).end(); // Respond with no content
});
app.get('/root',async(req, res) => {
  const children=await prisma.godown.findMany({
    where:{
      parentGodownId:null
    }
    ,select:{
      id:true,
      godown_id:true,
      name:true,
      children:{
        select:{
          id:true,
          godown_id:true,
          name:true,
  
        }
      } 
      ,
      Item:{
        select:{
          id:true,
          item_id:true,
          name:true
        }
      }
    },
  })
  res.send(children);
  // res.send('Hello NOD Readers!');
})
app.get('/:id', async(req, res) => {
  const {id}=req.params;
  console.log(id);
  const children=await prisma.godown.findUnique({
    where:{
      godown_id:id
    },select:{
      id:true,
      godown_id:true,
      name:true,
      children:{
        select:{
          id:true,
          godown_id:true,
          name:true,
          level:true
        }
      } 
      ,
      Item:{
        select:{
          id:true,
          item_id:true,
          name:true
        }
      }
    },
  })
  // console.log(children?.children)
  res.send(children);
});

app.listen(port, () => {
return console.log(`Express server is listening at http://localhost:${port} 🚀`);
});