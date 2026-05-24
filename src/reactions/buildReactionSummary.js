export function buildReactionSummary(

  reactions

){

  const counts = {

    like:0,

    love:0,

    haha:0,

    wow:0,

    sad:0,

    angry:0,

    fire:0

  };


  reactions.forEach(reaction => {

    if(

      counts[
        reaction.reaction_type
      ] !== undefined

    ){

      counts[
        reaction.reaction_type
      ]++;

    }

  });


  // SORT TOP REACTIONS

  const topReactions =

    Object.entries(counts)

    .sort(

      (a,b) => b[1] - a[1]

    )

    .filter(item => item[1] > 0)

    .slice(0,4)


    .map(item => item[0]);


  return {

    counts,

    topReactions,

    total:
      reactions.length

  };

}