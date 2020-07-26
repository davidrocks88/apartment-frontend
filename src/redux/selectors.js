export const getCommunities = state => Object.values(state.communities.communities);
export const getStatus = state => state.communities.status;
export const getSelectedCommunityId = state => state.communities.selectedCommunityId;
export const getSelectedCommunity = state => {
  const communities = getCommunities(state);
  const id = getSelectedCommunityId(state);
  if (id && communities.length) {
    const matches = communities.filter(c=>c.id === id);
    if (matches.length) {
      return matches[0];
    }
  }
  else {
    return undefined;
  }
}
export const getCommunityByIndex = index => state => Object.values(state.communities.communities)[index];
export const getCommunityById = community_id => state => state.communities.communities[community_id]

export const getApartmentsByCommunityId = community_id => state => {
  if (state.apartments.status === "SUCCESS") {
    return Object.values(state.apartments.apartments).filter(a=>a.communityID === community_id)
  }
  else return [];
}

export const getSelectedApartmentUnit = state => state.apartments.selectedApartment;

export const getShowApartmentUnitModal = state => state.apartments.showModal;

export const getApartmentRoomsFilter = state => state.apartments.roomFilter;