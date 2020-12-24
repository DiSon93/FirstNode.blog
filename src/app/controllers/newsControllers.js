class NewsController {
   index(req,res) {
    res.render('news');
   } 

   show(req,res) {
      res.send("New HELLO!!!!")
   }
};
module.exports = new NewsController;