# dos

API url 

https://still-tundra-79168.herokuapp.com/degree/get?actorurl1=ajith-kumar&actorurl2=vijay


UI client 

https://peaceful-savannah-65702.herokuapp.com/src/client/index.html

logic 

parallel BFS search algorithm

successors1 = (person1);
successors2 = (person2);
degree = 1;
loop {
    successors1 = successors(successors1);
    if (intersects(successors1, successors2)) {
        return degree;
    }
    degree += 1;
    successors2 = successors(successors2);
    if (intersects(successors2, successors1)) {
        return degree;
    }
    degree += 1;
}
