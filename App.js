import { useState } from 'react';

import Wrapper from './src/components/Wrapper';
import Screen from './src/components/Screen';
import ButtonBox from './src/components/ButtonBox';
import Button from './src/components/Button';

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
]

function toLocaleString(num) {
  return String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ")
}

function removeSpaces(num) {
  return num.toString().replace(/\s/g, "");
}

export default function App() {
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  })

  function numClickHandler(e) {
    e.preventDefault();
    const value = e.target.innerHTML;

    if(removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num: 
          calc.num === 0 && value === "0"
            ? "0"
            : removeSpaces(calc.num) % 1 === 0
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
      res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  function commaClickHandler(e) {
    e.preventDefault();
    const value = e.target.innerHTML;
    
    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".")
      ? calc.num + value
      : calc.num,
    })
  }

  function signClickHandler(e) {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    })

  }

  function equalsClickHandler() {
    if(calc.sign && calc.num) {
      const  math = (a, b, sign) =>
        sign === "+"
        ? a + b
        : sign === "-"
        ? a - b
        : sign === "X"
        ? a * b
        : a / b;

      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? "Err: Can't Divide with 0"
            : toLocaleString( 
              math(
                Number(removeSpaces(calc.res)),
                Number(removeSpaces(calc.num)),
                calc.sign
              )
            ),
        sign: "",
        num: 0,
      });
    } 
  };

  function invertClickHandler() {
    setCalc({
      ...calc,
      num: calc.num ? toLocaleString((removeSpaces(calc.num)) * -1 ): 0,
      res: calc.res ? toLocaleString((removeSpaces(calc.res)) * -1 ): 0,
      sign: "",
    })
  }

  function percentClickHandler() {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0

    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    });
  };

  function resetClickHandler() {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    })
  }

  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
      {btnValues.flat().map((btn, i) => {
          return (
            <Button
              ket={i}
              className={btn === "=" ? 'equals' : ""}
              value={btn}
              onClick={
                btn === "C"
                  ? resetClickHandler
                  : btn === "+-"
                  ? invertClickHandler
                  : btn === "%"
                  ? percentClickHandler
                  : btn === "="
                  ? equalsClickHandler
                  : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                  ? signClickHandler
                  : btn === "."
                  ? commaClickHandler
                  : numClickHandler
              }
            />
          )
        })
      }
      </ButtonBox>
    </Wrapper>
  );
};