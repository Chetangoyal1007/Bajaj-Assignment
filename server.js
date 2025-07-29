const express = require('express');
const app = express();

app.use(express.json());

app.post('/bfhl', (req, res) => {
  try {
    const data = req.body.data;
    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: 'Invalid input format' });
    }

    const user_id = 'chetan_goyal_10072004'; 
    const email = 'chetan1457.be22@chitkara.edu.in';  
    const roll_number = '2210991457';       

    const even_numbers = [];
    const odd_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;

    for (let item of data) {
      const strItem = String(item);
      if (/^\d+$/.test(strItem)) {
        const num = parseInt(strItem);
        sum += num;
        num % 2 === 0 ? even_numbers.push(strItem) : odd_numbers.push(strItem);
      } else if (/^[a-zA-Z]+$/.test(strItem)) {
        alphabets.push(strItem.toUpperCase());
      } else {
        special_characters.push(strItem);
      }
    }

    
    const reversedAlpha = alphabets.join('').split('').reverse();
    let concat_string = '';
    reversedAlpha.forEach((char, index) => {
      concat_string += index % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
    });

    res.status(200).json({
      is_success: true,
      user_id,
      email,
      roll_number,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sum),
      concat_string
    });

  } catch (error) {
    res.status(500).json({
      is_success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
