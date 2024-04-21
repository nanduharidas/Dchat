import React, { useState, useContext } from "react";
import Image from "next/image";
import Style from "./Filter.module.css";
import images from "../../assets";
import { ChatAppContect } from "../../Context/ChatAppContext";
import { Model } from "../index";

const Filter = () => {
  const { account, addFriends } = useContext(ChatAppContect);

  // State to manage the search query
  const [searchQuery, setSearchQuery] = useState("");

  // State to manage the display of the model component
  const [addFriend, setAddFriend] = useState(false);

  // Filtered accounts based on search query
  const filteredAccounts = Array.isArray(account)
    ? account.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className={Style.Filter}>
      <div className={Style.Filter_box}>
        <div className={Style.Filter_box_left}>
          <div className={Style.Filter_box_left_search}>
            <Image src={images.search} alt="image" width={20} height={20} />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className={Style.Filter_box_right}>
          <button onClick={() => setAddFriend(true)}>
            <Image src={images.user} alt="clear" width={20} height={20} />
            ADD FRIEND
          </button>
        </div>
      </div>

      {/* MODEL COMPONENT */}
      {addFriend && (
        <div className={Style.Filter_model}>
          <Model
            openBox={setAddFriend}
            title="WELCOME TO"
            head="FLASH CHAT"
            smallInfo="Enter the name and address..."
            image={images.hero}
            functionName={addFriends}
          />
        </div>
      )}

      {/* Display filtered accounts */}
      <div className={Style.Filtered_accounts}>
        {filteredAccounts.map(user => (
          <div key={user.id}>{user.name}</div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
