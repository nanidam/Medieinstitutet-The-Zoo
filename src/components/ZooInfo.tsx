import "./ZooInfo.scss";

export const ZooInfo = () => {
  return (
    <>
      <h1 className="welcome">Välkommen!</h1>
      <p className="info-text">
        På detta Zoo får du träffa och lära känna 15 olika djur. Du kan klicka
        på ett djur för att få läsa mer om djuret. På detta zoo har du även
        möjlighet att mata djuren! <br />
        Grön ring betyder att djuret fortfarande är mätt och därför går det inte
        att mata. <br />
        Orange ring betyder att djuret börjar bli hungrig så det är ok att mata.
        <br />
        Röd ring betyder att djuret är hungrig och det är dags för att mata!
      </p>
    </>
  );
};

export default ZooInfo;
