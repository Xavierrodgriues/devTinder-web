/* eslint-disable react/prop-types */
const UserCard = ({user}) => {
    const {firstName, lastName, about, age, photoUrl} = user;
  return (
    <div>
      <div className="card bg-base-300 h-[34rem] w-96 shadow-xl">
        <figure>
          <img
            src={photoUrl?user.photoUrl:"https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>Age: {age}</p>
          <p>{about}</p>
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
