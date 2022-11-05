class Profile {
  public id: number | null;
  public name: string;
  public currentWeight: number | null;
  public targetWeight: number | null;
  // public burnedList: { timestamp: number; calories: number }[];
  public burnedList: Array<{ timestamp: number; calories: number }> | null;

  constructor(
    id: number,
    name: string,
    currentWeight: number,
    targetWeight: number,
    burnedList: Array<{ timestamp: number; calories: number }> = []
  ) {
    this.id = id;
    this.name = name;
    this.currentWeight = currentWeight;
    this.targetWeight = targetWeight;
    this.burnedList = burnedList;
  }
}

export { Profile };
