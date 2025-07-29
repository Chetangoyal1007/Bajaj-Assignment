const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());


function isNumber(str) {
  return !isNaN(str) && !isNaN(parseFloat(str));
}


function isAlpha(char) {
  return /^[A-Za-z]$/.test(char);
}


function isSpecialChar(char) {
  return !/^[A-Za-z0-9]$/.test(char);
}


function createConcatString(alphabets) {

  let allChars = [];

  alphabets.forEach((item) => {
    for (let char of item) {
      if (isAlpha(char)) {
        allChars.push(char.toLowerCase());
      }
    }
  });


  allChars.reverse();


  let result = "";
  for (let i = 0; i < allChars.length; i++) {
    if (i % 2 === 0) {
      result += allChars[i].toUpperCase(); 
    } else {
      result += allChars[i].toLowerCase();     }
  }

  return result;
}


app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;


    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        user_id: "chetan_goyal_10072004", 
        email: "chetan1457.be22@chitkara.edu.in",
        roll_number: "2210991457", 
        odd_numbers: [],
        even_numbers: [],
        alphabets: [],
        special_characters: [],
        sum: "0",
        concat_string: "",
        error: "Invalid input: 'data' should be an array",
      });
    }


    if (data.length === 0) {
      return res.status(200).json({
        is_success: false,
        user_id: "chetan_goyal_10072004", 
        email: "chetan1457.be22@chitkara.edu.in", 
        roll_number: "2210991457", 
        odd_numbers: [],
        even_numbers: [],
        alphabets: [],
        special_characters: [],
        sum: "0",
        concat_string: "",
        error: "Empty data array provided",
      });
    }

    
    const oddNumbers = [];
    const evenNumbers = [];
    const alphabets = [];
    const specialCharacters = [];
    let sum = 0;
    let processingErrors = [];

    
    data.forEach((item, index) => {
      try {
        const itemStr = String(item);

        if (isNumber(itemStr)) {
          const num = parseInt(itemStr);

          
          if (isNaN(num)) {
            processingErrors.push(
              `Invalid number at index ${index}: ${itemStr}`
            );
            return;
          }

          sum += num;

          if (num % 2 === 0) {
            evenNumbers.push(itemStr);
          } else {
            oddNumbers.push(itemStr);
          }
        } else if (itemStr.length === 1 && isAlpha(itemStr)) {
          alphabets.push(itemStr.toUpperCase());
        } else if (itemStr.length > 1) {
          
          let isAllAlpha = true;
          for (let char of itemStr) {
            if (!isAlpha(char)) {
              isAllAlpha = false;
              break;
            }
          }

          if (isAllAlpha) {
            alphabets.push(itemStr.toUpperCase());
          } else {
           
            specialCharacters.push(itemStr);
          }
        } else if (itemStr.length === 1 && isSpecialChar(itemStr)) {
          specialCharacters.push(itemStr);
        } else {
         
          processingErrors.push(
            `Unprocessable item at index ${index}: ${itemStr}`
          );
        }
      } catch (itemError) {
        processingErrors.push(
          `Error processing item at index ${index}: ${itemError.message}`
        );
      }
    });

  
    const isSuccess = processingErrors.length === 0;

   
    let concatString = "";
    try {
      concatString = createConcatString(alphabets);
    } catch (concatError) {
      processingErrors.push(
        `Error creating concat string: ${concatError.message}`
      );
    }

    
    const response = {
      is_success: isSuccess,
      user_id: "chetan_goyal_10072004", 
      email: "chetan1457.be22@chitkara.edu.in", 
      roll_number: "2210991457", 
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
      special_characters: specialCharacters,
      sum: sum.toString(),
      concat_string: concatString,
    };

    
    if (processingErrors.length > 0) {
      response.errors = processingErrors;
    }

    
    const statusCode = isSuccess ? 200 : 422; 
    res.status(statusCode).json(response);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({
      is_success: false,
      user_id: "chetan_goyal_08052004", 
      email: "chetan1457.be22@chitkara.edu.in", 
      roll_number: "2210991457", 
      odd_numbers: [],
      even_numbers: [],
      alphabets: [],
      special_characters: [],
      sum: "0",
      concat_string: "",
      error: "Internal server error",
    });
  }
});


app.get("/bfhl", (req, res) => {
  res.status(200).json({
    operation_code: 1,
  });
});


app.get("/", (req, res) => {
  res.json({
    message: "BFHL API is running",
    endpoints: {
      POST: "/bfhl",
      GET: "/bfhl",
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;