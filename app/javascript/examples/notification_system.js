import React from "react";

function TopMenuNormandyCenter({
  uclaNormandies,
  toggleUclaNormandiesReadStatus,
  markUclaNormandyRead,
  markUclaNormandyUnread,
  lastWebsockReceivedUclaNormandy,
  unreadUclaNormadiesCount,
  hasUnreadUclaNormandies
}) {
  return (
    <>
      <TopMenuNormandyCenterIcon
        hasUnreadUclaNormandies={hasUnreadUclaNormandies}
      />
      {
        uclaNormandies.map(({ uclaNormandy }) => {
          return <TopMenuNormandyCenterListItem
                   uclaNormandy={uclaNormandy}
                   markUclaNormandyRead={markUclaNormandyRead}
                 />;
        })
      }
    </>
  );
}

function TopMenuNormandyCenterListItem({ }) {
  return <ViewStuff onClick={markUclaNormandyRead} />
}

function NormandyCenterFlashMessage({
  lastWebsockReceivedUclaNormandy,
  markUclaNormandyRead
}) {
  useEffect(() => {
    // I watch the "lastWebsockReceivedUclaNormandy" to pop up a toast
    // whenever it changes.
  })
}

export withNotifiableNormandies(MenuNormandyCenter);
export withNotifiableNormandies(NormandyCenterFlashMessage);
