import React, { useState } from "react";
import "./NeanderSimulator.css";

const NeanderSimulator = () => {
  const [memory, setMemory] = useState(new Array(256).fill(0));
  const [ac, setAC] = useState(0);
  const [pc, setPC] = useState(0);
  const [program, setProgram] = useState([]);
  const [codeInput, setCodeInput] = useState("");

  const renderMemory = () => {
    return memory.map((value, index) => (
      <div key={index} className="memory-cell">
        {value}
      </div>
    ));
  };

  const updateStatus = () => {
  };

  const loadProgram = () => {
    const lines = codeInput.split("\n").map((line) => line.trim());
    setProgram(lines);
    setPC(0);
    setAC(0);
    setMemory(new Array(256).fill(0));
  };

  const executeInstruction = () => {
    if (pc >= program.length) {
      alert("Programa terminado.");
      return;
    }

    const instruction = program[pc];
    const [operation, operand] = instruction.split(" ");
    const address = parseInt(operand, 10);
    let newAC = ac;
    let newMemory = [...memory];
    let newPC = pc;

    switch (operation.toUpperCase()) {
      case "LOAD":
        newAC = newMemory[address];
        break;
      case "STORE":
        newMemory[address] = newAC;
        break;
      case "ADD":
        newAC += newMemory[address];
        break;
      case "SUB":
        newAC -= newMemory[address];
        break;
      case "JUMP":
        newPC = address - 1;
        break;
      case "JZ":
        if (newAC === 0) newPC = address - 1;
        break;
      case "NOP":
        break;
      default:
        alert(`Instrução desconhecida: ${operation}`);
    }

    setAC(newAC);
    setMemory(newMemory);
    setPC(newPC + 1);
  };

  const runProgram = () => {
    while (pc < program.length) {
      executeInstruction();
    }
  };

  const resetProgram = () => {
    loadProgram();
    setPC(0);
    setAC(0);
  };

  return (
    <div className="neander-simulator">
      <textarea
        value={codeInput}
        onChange={(e) => setCodeInput(e.target.value)}
        placeholder="Digite o programa aqui..."
      />
      <div className="buttons">
        <button onClick={loadProgram}>Carregar</button>
        <button onClick={runProgram}>Executar</button>
        <button onClick={executeInstruction}>Passo a Passo</button>
        <button onClick={resetProgram}>Resetar</button>
      </div>
      <div className="status">
        <p>Acumulador (AC): {ac}</p>
        <p>Program Counter (PC): {pc}</p>
      </div>
      <div className="memory">
        <h3>Memória:</h3>
        <div className="memory-grid">{renderMemory()}</div>
      </div>
    </div>
  );
};

export default NeanderSimulator;
