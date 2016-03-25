module.exports = {
  index: function (req, res, next) {
    var random = function(){
      return parseInt(Math.random()*100);
    }
    var datas = {
      labels : ['1','2','3','4','5','6','7'],
      datasets : [[random(),random(),random(),random(),random(),random(),random()],
                  [random(),random(),random(),random(),random(),random(),random()]]
    }
    return res.view('homepage',{
      datas : datas
    });
  }
};
