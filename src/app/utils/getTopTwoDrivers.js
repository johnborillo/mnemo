export const getTopTwoDrivers = (dayData) => {
  const drivers = [
    { name: 'emotionMood', value: dayData.emotionMood },
    { name: 'newPeople', value: dayData.newPeople },
    { name: 'photoBursts', value: dayData.photoBursts },
    { name: 'taskSwitches', value: dayData.taskSwitches },
    { name: 'uniquePeople', value: dayData.uniquePeople },
    { name: 'uniquePlaces', value: dayData.uniquePlaces },
  ];

  drivers.sort((a, b) => b.value - a.value);

  const topDrivers = drivers.slice(0, 2);

  return topDrivers.map(driver => {
    let name = '';
    switch (driver.name) {
      case 'emotionMood':
        name = 'emotion mood';
        break;
      case 'newPeople':
        name = 'new people';
        break;
      case 'photoBursts':
        name = 'photo bursts';
        break;
      case 'taskSwitches':
        name = 'task switches';
        break;
      case 'uniquePeople':
        name = 'unique people';
        break;
      case 'uniquePlaces':
        name = 'unique places';
        break;
      default:
        name = driver.name;
    }
    return `${driver.value} ${name}`;
  }).join(', ');
};