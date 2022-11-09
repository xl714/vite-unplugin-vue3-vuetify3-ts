import { Profile } from '../modules/profile';

function computeChartData(profile: Profile) {
  console.log(`computeChartData`);
  console.log(`computeChartData props.profile: ${profile.toString()}`);
  let weightTsAr = Object.keys(profile.weightList).map((i) => parseInt(i));
  let burnedTsAr = Object.keys(profile.burnedList).map((i) => parseInt(i));
  console.log('weightTsAr', weightTsAr, 'burnedTsAr', burnedTsAr);
  if (!(weightTsAr.length > 0 && burnedTsAr.length)) {
    console.log('data not found');
    return new Date();
  }
  let weightTsArReadable = Object.keys(profile.weightList).map(
    (i) => new Date(parseInt(i) * 1000).toISOString().split('T')[0]
  );
  let burnedTsArReadable = Object.keys(profile.burnedList).map(
    (i) => new Date(parseInt(i) * 1000).toISOString().split('T')[0]
  );
  let tsArray = weightTsAr.concat(burnedTsAr);
  // console.log('tsArray', tsArray);
  // const reducer = (accumulator, currentValue) => (currentValue > accumulator) ? currentValue : accumulator;
  // const max = tsArray.reduce(reducer, 0);
  let max = Math.max(...tsArray);
  let min = Math.min(...tsArray);
  // console.log('min:', min, new Date(min * 1000).toISOString().split('T')[0], 'max:', max, new Date(max * 1000).toISOString().split('T')[0]);
  let secondsInDay = 24 * 60 * 60;
  let chartLabelsReadable = [];
  let chartWeightAr = [];
  let chartBurnedAr = [];
  for (let i = min; i <= max; i += secondsInDay) {
    let readableDate = new Date(i * 1000).toISOString().split('T')[0];
    // console.log(i, readableDate);
    chartLabelsReadable.push(readableDate);
    chartWeightAr.push(i in profile.weightList ? profile.weightList[i] : null);
    chartBurnedAr.push(i in profile.burnedList ? profile.burnedList[i] : null);
  }
  // console.log('chartLabels', chartLabels);
  // console.log('chartWeightAr', chartWeightAr);
  // console.log('chartBurnedAr', chartBurnedAr);
  //console.log('weightTsArReadable', weightTsArReadable, 'burnedTsArReadable', burnedTsArReadable);

  return {
    chartLabels: chartLabelsReadable,
    chartValuesWeight: chartWeightAr,
    chartValuesBurned: chartBurnedAr,
  };
}

// 👇️ named export
export { computeChartData };
