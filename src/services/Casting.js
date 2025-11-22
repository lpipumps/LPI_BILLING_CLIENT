export const savecasting=async(castingDetails)=>{
    const response=await fetch(`${process.env.REACT_APP_API_URL}/lgc/savecasting`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(castingDetails)
    });
    return response;
    };
    export const fetchcasting = async() => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/lgc/fetchcasting`);
        return response;
      };
      export const updateCasting = async (casting_name, updatedDetails) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/lgc/updatecasting/${casting_name}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedDetails)
        });
        return response;
    };
    
      export const deleteCasting=async(casting_name)=>{
        const response = await fetch(`${process.env.REACT_APP_API_URL}/lgc/deletecasting/${casting_name}`, {
            method: 'DELETE',
          });
          return response;
    }