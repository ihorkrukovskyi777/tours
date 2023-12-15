export const getLessonsSection = async(slug) => {

    const response = await fetch( `${slug}`, {
        cache: "no-store",
      }
    );
  
    if( !response.ok ) throw new Error( "Ошибка при получении секции" );
   
    return response.json();
  };