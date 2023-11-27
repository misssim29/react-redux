import { useEffect, useState } from 'react';

function CoinTracker() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [mycoin, setMycoin] = useState('');
  const [selectCoin, setSelectCoin] = useState('');
  useEffect(() => {
    fetch('https://api.coinpaprika.com/v1/tickers').then((res) => {
      res.json().then((json) => {
        setCoins(json);
        setLoading(false);
        setSelectCoin(json[0].quotes.USD.price);
      });
    });
  }, []);
  const ChangeCoin = (event) => {
    const num = event.target.value / selectCoin;
    setMycoin(num);
  };
  const ChangeType = (event) => {
    setSelectCoin(event.target.value);
  };
  return (
    <div>
      <h1>The Coins! {loading ? '' : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select onChange={ChangeType}>
          {coins.map((item) => (
            <option key={item.id} value={item.quotes.USD.price}>
              {item.name} ({item.symbol}): {item.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      <div>
        <input type="text" placeholder="USD" onChange={ChangeCoin}></input>
        <div>{mycoin} Coin</div>
      </div>
    </div>
  );
}
export default CoinTracker;
