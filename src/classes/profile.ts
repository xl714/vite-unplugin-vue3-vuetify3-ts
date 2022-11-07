class Profile {
  public id: number | null;
  public name: string;
  public startWeight: number | null;
  public targetWeight: number | null;
  // public burnedList: { timestamp: number; calories: number }[] | null ;
  public burnedList: Array<{ timestamp: number; calories: number }> | null;
  public weightList: Array<{ timestamp: number; calories: number }> | null;

  constructor(
    id: number | null = null,
    name: string = 'Joe',
    startWeight: number | null = 88,
    targetWeight: number | null = 71,
    burnedList: Array<{ timestamp: number; calories: number }> | null = [],
    weightList: Array<{ timestamp: number; calories: number }> | null = []
  ) {
    this.id = id;
    this.name = name;
    this.startWeight = startWeight;
    this.targetWeight = targetWeight;
    this.burnedList = burnedList;
    this.weightList = weightList;
  }

  static fromObject = (o: object) => {
    return Object.assign(new Profile(), o);
    // return new Profile(
    //   o['id'],
    //   o['name'],
    //   o['startWeight'],
    //   o['targetWeight'],
    //   o['burnedList'],
    //   o['weightList']
    // );
  };

  toString = () => {
    return `Profile{id:${this.id}, name:${this.name}, startWeight:${this.startWeight}, targetWeight:${this.targetWeight} }`;
  };
}

interface ProfileListManager {
  profilesMap: Map<number, Profile>;
  loadList(): Map<number, Profile>;
  getList(): Map<number, Profile>;
  getById(id: number): Profile | null;
  saveProfile(p: Profile): Profile;
  saveProfiles(): boolean;
  removeProfile(id: number): boolean;
  toString(): string;
}

class ProfileListManagerLocalStorage implements ProfileListManager {
  public profilesMap: Map<number, Profile>;
  constructor(profilesMap: Map<number, Profile> = new Map()) {
    this.profilesMap = profilesMap;
  }
  getById(id: number, defaultValue: Profile | null = null) {
    if (this.profilesMap.has(id)) {
      return this.profilesMap.get(id);
    }
    return defaultValue;
  }
  getList() {
    console.log('ProfileListManagerLocalStorage.getList');
    return this.profilesMap;
  }
  loadList() {
    // https://www.cloudhadoop.com/2018/09/typescript-how-to-convert-map-tofrom.html
    console.log('ProfileListManagerLocalStorage.loadList');
    if (localStorage.getItem('profiles')) {
      try {
        let jsonStr = localStorage.getItem('profiles');
        let jsonObj = JSON.parse(jsonStr);
        this.profilesMap = new Map();
        for (const [key, value] of Object.entries(jsonObj)) {
          console.log(`${key}:`, typeof value, value);
          this.profilesMap.set(parseInt(key), Profile.fromObject(value));
        }
        return this.profilesMap;
      } catch (e) {
        localStorage.removeItem('profiles');
        console.log("Failure > localStorage.removeItem('profiles');");
      }
    }
    return new Map();
  }
  saveProfile(profile: Profile) {
    console.log('ProfileListManagerLocalStorage.saveProfile');
    if (!profile.id) {
      let keys = [...Array.from(this.profilesMap.keys())];
      profile.id = keys.length > 0 ? Math.max(...keys) + 1 : 1;
    }
    console.log('profile.id', profile.id);
    this.profilesMap.set(profile.id, profile);
    this.saveProfiles();
    return profile;
  }
  saveProfiles() {
    console.log('ProfileListManagerLocalStorage.saveProfiles');
    let o = {};
    this.profilesMap.forEach((value, key) => {
      let { ...obj_ } = value;
      o[key] = obj_;
    });
    const parsed = JSON.stringify(o);
    console.log('saveProfiles parsed', parsed);
    localStorage.setItem('profiles', parsed);
    return true;
  }

  removeProfile(id: number) {
    console.log('ProfileListManagerLocalStorage.removeProfile');
    this.profilesMap.delete(id);
    this.saveProfiles();
    return true;
  }

  toString() {
    let str_ = '';
    // for (let [key, value] of this.profilesMap) {
    //   console.log(key + " = " + value);
    //   }
    this.profilesMap.forEach(function (v, k) {
      str_ += `\n  ${k}: ${v.toString()}`;
    });
    str_ = `Profiles{${str_}\n}`;
    console.log(str_);
    return str_;
  }
}

export { Profile };
export { ProfileListManagerLocalStorage };
