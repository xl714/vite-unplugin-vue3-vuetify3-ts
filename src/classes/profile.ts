class Profile {
  public id: number | null;
  public name: string;
  public startWeight: number | null;
  public targetWeight: number | null;
  // public burnedList: { timestamp: number; calories: number }[] | null ;
  // public burnedList: Array<{ timestamp: number; calories: number }> | null;
  public burnedList: object | null;
  public weightList: object | null;

  constructor(
    id: number | null = null,
    name: string = 'Joe',
    startWeight: number | null = 88,
    targetWeight: number | null = 71,
    // burnedList: Array<{ timestamp: number; calories: number }> | null = [],
    burnedList: object | null = {},
    weightList: object | null = {}
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
  saveProfileData(
    profile: Profile,
    date: Date,
    datetype: string,
    value: number
  ): Profile | null;
  getProfileData(id: number, datetype: string): object;
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
    // https://www.typescriptlang.org/play?ts=4.8.4#code/MYGwhgzhAEAKBOB7AZgSxAU2gbwFDWgAcBXAIxFWGlQBMAuaAO2IFtSN5oAfJ4kEANz4iZClUZgWGBhAAu8VIwDmQgiXKVocsPFkB1DKiUALWQ2ZsO3Xv1UiNVWTqUZ9hk2d6XOPZreHAiIxy8MTAsojwABTCBLTmrOw+NiDQALwpADSxTJLSWvKKSunQAOQAUogYpdkEBNq6BkamCd4lABzttXVO8C5uzZ4WSSUA7ACMwgCUODmyxqgQAHS0JbR2BPOLSxJSJbsYG9Bbyw0DHiVnTR5HJ0u9-demJQ+uT7J2AL7CEQDKhcoSlEZmkAHyzOrQeCuYjwRjQAAGCBQ6Aw2HiABJsHdaJ9MrkpHQsXcDniCjpzi1iQtTr1KbIya96UTsTT7s43u5TJ9oJ8EV8hN9MLJoCw6ABZMCEAA8ww4+ORaEw4IyjAwAHdoJLCMChCwlhBXFFxvi1ZrFajjfiAEQADTAADdUBxrfjOviJlMpkJAsFEJgliBEEooixvbhhdBECVsJ89UtkJEAKJgYDGKJRB1gEDEDD4gDWGAAniDwdgCDlEABtQtFgC6JSzOcO0Fwn29Fd9EH9GEDwai5V+AHkAHIGgFKVDIItRRBe1tAA
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
    localStorage.removeItem(`profile_${id}_weight`);
    localStorage.removeItem(`profile_${id}_burned`);
    return true;
  }

  toString() {
    let str_ = '';
    // for (let [key, value] of this.profilesMap) {
    //   console.log(key + " = " + value);
    // }
    this.profilesMap.forEach(function (v, k) {
      str_ += `\n  ${k}: ${v.toString()}`;
    });
    str_ = `Profiles{${str_}\n}`;
    console.log(str_);
    return str_;
  }

  saveProfileData(
    profile: Profile,
    date: Date,
    datetype: string,
    value: number
  ) {
    let timestamp = date.getTime() / 1000;
    if (datetype == 'weight') {
      profile.weightList[timestamp] = value;
    } else if (datetype == 'calories' || datetype == 'burned') {
      profile.burnedList[timestamp] = value;
    } else {
      alert('saveProfileData error');
      return null;
    }
    const parsed = JSON.stringify(profile.burnedList);
    const key = `profile_${profile.id}_${datetype}`;
    console.log(`saveProfileData ${key} parsed`, parsed);
    localStorage.setItem(key, parsed);
    return profile;
  }
  getProfileData(id: number, datetype: string) {
    const key = `profile_${id}_${datetype}`;
    const jsonStr = localStorage.getItem(key);
    const jsonObj = JSON.parse(jsonStr);
    return jsonObj;
  }
}

export { Profile };
export { ProfileListManagerLocalStorage };
