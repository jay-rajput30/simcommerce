import "./Categories.css";
const Categories = () => {
  return (
    <section className="home--categories--container">
      <div className="home-categories">
        <div className="home-categories--item">
          <figure className="home-categories--item__one">
            <img
              src="https://images.unsplash.com/photo-1593341646782-e0b495cff86d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y3JpY2tldHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt="cricket batsman playing a shot"
            />
            <figcaption className="">cricket bats</figcaption>
          </figure>
          <figure className="home-categories--item__two">
            <img
              src="https://images.unsplash.com/photo-1587385789097-0197a7fbd179?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y3JpY2tldHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
              alt="a cricket ball"
            />
            <figcaption className="">cricket balls</figcaption>
          </figure>
        </div>
        <div className="home-categories--item">
          <figure className="home-categories--item__three">
            <img
              src="https://media.istockphoto.com/photos/cricket-practice-net-picture-id1141948773?b=1&k=20&m=1141948773&s=170667a&w=0&h=2sc09Hq4vEW8NgsCZYVx7UkvpeR3us13LJZa-YHcYLo="
              alt="batting practise safety nets"
            />
            <figcaption className="">practise nets</figcaption>
          </figure>
          <figure className="home-categories--item__four">
            <img
              src="https://media.istockphoto.com/photos/blue-and-white-leather-batting-gloves-isolated-on-white-picture-id184141809?b=1&k=20&m=184141809&s=170667a&w=0&h=Qlkf42YOcUruWPmZOayGLASpYbq5c4Gb6yrF969EXE0="
              alt="cicket gloves"
            />
            <figcaption className="">cricket gloves</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default Categories;
