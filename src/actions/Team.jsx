export function getTeam(groupname, token) {
    return {
      type: "UPDATE_TEAM",
      groupname: groupname,
      token: token,
      setMemberList: (memberList, dispatch) => dispatch(setMemberList(memberList)),
      setLeader: (leader, dispatch) => dispatch(setLeader(leader))
    }   
}
  
export function setMemberList(memberList) {
    return {
        type: "SET_MEMBER_LIST",
        memberList: memberList
    }
}

export function setLeader(leader) {
    return {
        type: "SET_LEADER",
        leader: leader
    }
}