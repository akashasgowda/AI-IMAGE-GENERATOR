import { useState, useEffect } from "react";
import { Loader, Card, FormField } from "../components";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />);
  }

  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-md uppercase">{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [searchedResults,setSearchedResults] = useState(null);
  const [searchTimeOut,setSearchTimeOut] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/v1/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const result = await response.json();

        // to show the newest add photos 1st
        setAllPosts(result.data.reverse());
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };
  // we using useEffect only once so no..dependecies
  useEffect(() => {
      fetchPosts();
  }, []);

  const handleSearchChange=(e)=>{
    clearTimeout(searchTimeOut);
    setSearchText(e.target.value);

    // we don't want each time to debounce
    // when we enter the text
  setSearchTimeOut(
    setTimeout(()=>{
      const searchResults = allPosts.filter((item)=> item.name.toLowerCase()
      .includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
      
      setSearchedResults(searchResults);
    },500)
  );
}

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1
          className="font-extrabold  text-[#222328]
        text-[32px]"
        >
          The Community Showcase
        </h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w[500px]">
          Browse through a collection of imaginative and visually stunning
          images generatedby DALL-E AI
        </p>
      </div>


      <div className="mt-16">
        <FormField 
            labelName='Search posts'
            type='text'
            name='text'
            placeholder='Search posts'
            value={searchText}
            handleChange={handleSearchChange}
        />
      </div>



      <div className="mt-10">
        {/* ternary condition -->if loading is true 
            then display loader else not */}
        {loading ? (
          <div className="flex  justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h3
                className="font-medium text-[#666e75]
              text-md mb-3"
              >
                Showing results for <span className="text-[#222328]">{searchText}</span>
              </h3>
            )}

            <div
              className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2
              grid-cols-1 gap-3"
            >
              {/* here we want to render cards */}
              {searchText ? (
                <RenderCards 
                   data={searchedResults} 
                   title="No Search Results Found"
                 />
              ) : (
                <RenderCards 
                    data={allPosts} 
                    title="No Posts Yet" 
                />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
