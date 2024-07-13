import React, { useCallback } from "react";
import { userService } from "../services";
import { useDispatch } from "react-redux";
import { setInfo } from "../slices";
import { debounce } from "lodash";
import UserAvatar from "./UserAvatar";
import Button from "./Button";
import ClickAwayListener from "react-click-away-listener";

// a component to select a referrer
const ReferrerSelector = React.forwardRef(function (
  {
    label = "Referrer",
    placeholder = "Search for a referrer by name or email",
    setValue,
    className = "",
    ...props
  },
  ref
) {
  // dispatcher
  const dispatch = useDispatch();

  // ref for actual input forwarded

  // ref for the search box
  const searchBoxRef = React.useRef(null);

  // state for dropdown to select referrers
  const [isDropdownOpen, setDropdownOpen] = React.useState(false);

  // state for the select options
  const [options, setOptions] = React.useState([]);

  // state for whether to display the selected referrer
  const [showSelectedReferrer, setShowSelectedReferrer] = React.useState(false);

  // state for selected referrer
  const [selectedReferrer, setSelectedReferrer] = React.useState(null);

  // id to connect the label with the input
  const id = React.useId();

  // callback to fetch the referrers
  const fetchReferrers = useCallback(async () => {
    // get the input value
    const searchValue = searchBoxRef.current.value;
    if (searchValue == "") return;

    try {
      // fetch the referrers
      const response = await userService.getUsersByNameOrEmail(searchValue);

      if (!response.ok) {
        throw new Error((await response.json()).message);
      }

      const referrers = await response.json();

      // set the options
      setOptions(referrers);

      // open the dropdown
      setDropdownOpen(true);
    } catch (error) {
      dispatch(
        setInfo({ shouldShow: true, infoMsg: error.message, infoType: "error" })
      );
    }
  }, []);

  // debouncing the callback
  const debouncedFetchReferrers = React.useMemo(() => {
    return debounce(fetchReferrers, 500);
  }, []);

  return (
    <div>
      {/* the actual input, in which id of referrer will be set on selection */}
      <input hidden {...props} ref={ref} defaultValue={"no-referrer"} />

      {/* label */}
      {label && (
        <label
          htmlFor={id}
          className="block text-sm text-gray-500 dark:text-gray-300"
        >
          {label}
        </label>
      )}

      {/* will show searchbox only when no referrer is selected, otherwise will show the selected referrer */}
      {!showSelectedReferrer ? (
        <div className=" flex flex-row">
          <input
            placeholder={placeholder}
            id={id}
            ref={searchBoxRef}
            onChange={debouncedFetchReferrers}
            autoComplete="off"
            // disabled when showSelectedReferrer
            disabled={showSelectedReferrer}
            className={`block  mt-2 w-full px-5 py-2.5 ${className}`}
          />

          {/* button to toggle dropdown */}
          <Button
            color="black"
            className="mt-2 rounded-r-md bg-gray-900 hover:bg-gray-700"
            handleClick={(e) => {
              e.preventDefault();
              setDropdownOpen(!isDropdownOpen);
            }}
          >
            <svg
              className="w-5 h-5 text-gray-800 dark:text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </div>
      ) : (
        <div>
          <button
            className="bg-gray-900 text-gray-300 border border-gray-700 w-full text-left hover:bg-gray-900 p-2 rounded-lg"
            onClick={(e) => {
              e.preventDefault();
              // clear everything
              setValue("referrerId", "no-referrer");
              setShowSelectedReferrer(false);
              setSelectedReferrer(null);
              setOptions([]);
              // searchBoxRef.current.value = ""
            }}
          >
            <UserAvatar
              user={{
                id: selectedReferrer.id,
                name: selectedReferrer.fullName,
                email: selectedReferrer.email,
                profilePhotoURL: selectedReferrer.profilePhotoURL,
              }}
              noLink
            />
          </button>
        </div>
      )}

      {/* dropdown for selecting referrer */}
      {isDropdownOpen && (
        <ClickAwayListener onClickAway={() => setDropdownOpen(false)}>
          <div className=" relative">
            <ul className="absolute max-h-28 overflow-hidden z-10 w-full bg-black text-white rounded-b-lg">
              <li className="p-2">
                <button
                  className="w-full text-center hover:bg-gray-900"
                  onClick={(e) => {
                    e.preventDefault();
                    // set the actual input value
                    setValue("referrerId", "no-referrer");
                    setDropdownOpen(false);
                    // set searchbox value
                    searchBoxRef.current.value = "No Referrer";
                  }}
                >
                  No Referrer (default)
                </button>
              </li>

              {options.map((option) => (
                <li key={option.id} className="p-2">
                  <button
                    className="w-full text-left hover:bg-gray-900 "
                    onClick={(e) => {
                      e.preventDefault();
                      // set the actual input value
                      setValue("referrerId", option.id);
                      // set the selected referrer
                      setSelectedReferrer(option);
                      // show the selected referrer
                      setShowSelectedReferrer(true);
                      // close the dropdown
                      setDropdownOpen(false);
                    }}
                  >
                    <UserAvatar
                      user={{
                        id: option.id,
                        name: option.fullName,
                        email: option.email,
                        profilePhotoURL: option.profilePhotoURL,
                      }}
                      noLink
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
});

export default ReferrerSelector;
