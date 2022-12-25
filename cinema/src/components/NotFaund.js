const NotFaund = ({ onNotFaund }) => {
  return (
    <div>
      <h1>Нет результата!</h1>
      <input
        type="btn"
        defaultValue="Вернуться на главную"
        onClick={() => onNotFaund()}
      />
    </div>
  );
};

export default NotFaund;
