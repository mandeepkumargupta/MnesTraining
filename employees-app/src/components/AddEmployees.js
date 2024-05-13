import react,{useState} from react

const CreateItem = () => {
    const [newItem,setNewItem] = useState({
        id:'',
        name:'',
        country:'',
        email:'',
        contact:'',
        nextId:1

    });

    const [itemList,setItemList] = useState([]);

    const handleInputChange = (Event) => {
        const{name,value} =Event.target;
        setNewItem((prevItem) => ({...prevItem,[name]:value}));
    };

    return(
        <div>
            <h3>Add new employee</h3>
            <div>
                <label>Name:</label>
                <br/>
                <input
                    type="text"
                    palceholder="Name"
                    name="name"
                    value={newItem.name}
                    onchange={handleInputChange}
                />
            </div>
        </div>
    )


}

export default CreateItem;