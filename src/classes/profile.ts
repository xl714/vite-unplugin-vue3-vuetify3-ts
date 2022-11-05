class Profile {
  public id: number | null;
  public name: string;
  public startWeight: number | null;
  public currentWeight: number | null;
  public targetWeight: number | null;
  // public burnedList: { timestamp: number; calories: number }[];
  public burnedList: Array<{ timestamp: number; calories: number }> | null;
  public weightList: Array<{ timestamp: number; calories: number }> | null;

  constructor(
    id: number = null,
    name: string = 'undefined profile',
    startWeight: number = null,
    currentWeight: number = null,
    targetWeight: number = null,
    burnedList: Array<{ timestamp: number; calories: number }> = [],
    weightList: Array<{ timestamp: number; calories: number }> = []
  ) {
    this.id = id;
    this.name = name;
    this.startWeight = startWeight;
    this.currentWeight = currentWeight;
    this.targetWeight = targetWeight;
    this.burnedList = burnedList;
    this.weightList = weightList;
  }
}

export { Profile };
