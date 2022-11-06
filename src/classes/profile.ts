class Profile {
  public id: number | null;
  public name: string;
  public startWeight: number | null;
  public targetWeight: number | null;
  // public burnedList: { timestamp: number; calories: number }[];
  public burnedList: Array<{ timestamp: number; calories: number }> | null;
  public weightList: Array<{ timestamp: number; calories: number }> | null;

  constructor(
    id: number = null,
    name: string = 'undefined profile',
    startWeight: number = null,
    targetWeight: number = null,
    burnedList: Array<{ timestamp: number; calories: number }> = [],
    weightList: Array<{ timestamp: number; calories: number }> = []
  ) {
    this.id = id;
    this.name = name;
    this.startWeight = startWeight;
    this.targetWeight = targetWeight;
    this.burnedList = burnedList;
    this.weightList = weightList;
  }

  toStr = () => {
    return `Profile{id:${this.id}, name:${this.name}, startWeight:${this.startWeight}, targetWeight:${this.targetWeight} }`;
  };
}

export { Profile };
