export default function weather({ daysString, image, max, min, date, i }) {
  return (
    <div key={i} className="block">
      <div>{daysString}</div>
      <img src={image} alt="Today's Weather" />
      <div>
        <span className="degrees">{max}</span>
        <span className="min">{min}</span>
      </div>
      <div className="date">{date}</div>
    </div>
  );
}
