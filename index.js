var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const axios = require('axios')

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded

/*app.get('/', function(req, res){
  var sumBsf = 0;
  var SolPeru = 0;
  axios.get('https://localbitcoins.com/sell-bitcoins-online/VE/venezuela/.json')
  .then(respV => {
    //console.log(resp.data.data.ad_list[0].data.temp_price)
    console.log("Estos son Bolivares Venezolanos");
    for(var i = 0; i < 10 ; i++)
    {
      sumBsf += parseInt(respV.data.data.ad_list[i].data.temp_price);
    }

    console.log(sumBsf/10);

    axios.get('https://localbitcoins.com/sell-bitcoins-online/PE/peru/.json')
    .then(respP => {
          console.log("Estos son Soles perueanos");
          for(var i = 0; i < 10 ; i++)
          {
            SolPeru += parseInt(respP.data.data.ad_list[i+1].data.temp_price);
          }

          console.log(SolPeru/10);

          var num = 10000000;
          console.log("si inviertes 10.000.000Bsf puedes conseguir aproximadamente")
          console.log((num/sumBsf) * SolPeru);
    })

    var string = "Convertir 1444456789";
    var numbers = string.match(/\d+/g).map(Number);
  })
})*/
//This is the route the API will call
app.post('/new-message', function(req, res) {
  const {message} = req.body
  var sumBsf      = 0;
  var SolPeru     = 0;
  //Each message contains "text" and a "chat" object, which has an "id" which is the chat id

  if (!message || message.text.toLowerCase().indexOf('convertir') <0) 
  {
    // In case a message is not present, or if our message does not have the word convertir in it, do nothing and return an empty response
    return res.end()
  }


  axios.get('https://localbitcoins.com/sell-bitcoins-online/VE/venezuela/.json')
    .then(respV => {
        var suma = 0;
    //console.log(resp.data.data.ad_list[0].data.temp_price)
        // console.log("Estos son Bolivares Venezolanos");
        for(var i = 0; i < 10 ; i++)
        {
          suma += parseInt(respV.data.data.ad_list[i].data.temp_price);
        }
        axios.get('https://localbitcoins.com/sell-bitcoins-online/PE/peru/.json')
        .then(respP => {
          var sumo = 0;
          for(var i = 0; i < 10 ; i++)
          {
            sumo += parseInt(respP.data.data.ad_list[i+1].data.temp_price);
          }
          suma = suma/10;
          sumo = sumo / 10;
          var string  = message.text;    
          var numbers = string.match(/\d+/g).map(Number);
          var final = (numbers/suma) * sumo;

          axios.post('https://api.telegram.org/bot541937141:AAHfgsAu6RhzFVgX2AVwl-QTZesgYNH3-aM/sendMessage', 
          {
            chat_id: message.chat.id,
            /*text: `Aproximadamente 1 bitcoin vale: *${SumBsf/10}*Bsf
            Aproximadamente 1 bitcoin vale: *${SolPeru/10}* Soles Peruanos
            Con *${numbers}*Bsf puedes comprar aproximadamente *${(numbers/sumBsf) * SolPeru}*`,
            parse_mode:'Markdown'*/
            text:`
            1 Bitcoin Cuesta Aproximadamente: *${suma}* Bsf
            1 Bitcoin Cuesta Aproximadamente: *${sumo}* Soles Peruanos
            con *${numbers}* Bsf puedes comprar aproximadamente *${final}* Soles Peruanos`,

            parse_mode:'Markdown'
          })          
        })

      })  

      .then(response => {
          // We get here if the message was successfully posted
          console.log('Message posted')
          res.end('ok')
      })
      .catch(err => {
          // ...and here if it was not
          console.log('Error :', err)
          res.end('Error :' + err)

/*      axios.get('https://localbitcoins.com/sell-bitcoins-online/PE/peru/.json')
        .then(respP => {
            console.log("Estos son Soles perueanos");
            for(var i = 0; i < 10 ; i++)
            {
              SolPeru += parseInt(respP.data.data.ad_list[i].data.temp_price);
            }

            console.log(SolPeru/10);
      var string  = message.text;    
      var numbers = string.match(/\d+/g).map(Number);
      console.log("llegue aqui");
      // If we've gotten this far, it means that we have received a message containing the word "marco".
      // Respond by hitting the telegram bot API and responding to the approprite chat_id with the word "Polo!!"
      // Remember to use your own API toked instead of the one below  "https://api.telegram.org/bot<your_api_token>/sendMessage"

    })*/
  })  
});

// Finally, start our server
app.listen(3000, function() {
  console.log('Telegram app listening on port 3000!');
});

//Recuerda agregar curl -F "url=https://bot-ibrgfpixpm.now.sh/new-message" https://api.telegram.org/bot541937141:AAHfgsAu6RhzFVgX2AVwl-QTZesgYNH3-aM/setWebhook