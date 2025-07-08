import validateLocation from "../validateLocation";

describe('validateLocation', () => {
  const originalAlert = global.alert;

  beforeEach(() => {
    global.alert = jest.fn(); // Мокаем alert
  });

  afterEach(() => {
    jest.clearAllMocks();
    global.alert = originalAlert; // Возвращаем alert
  });

  it('should return correct latitude and longitude for valid input', () => {
    const input = '55.75, 37.61';
    const result = validateLocation(input);
    expect(result).toEqual({ latitude: 55.75, longitude: 37.61 });
    expect(global.alert).not.toHaveBeenCalled();
  });

  it('should return null and alert for wrong format', () => {
    const input = 'invalid input';
    const result = validateLocation(input);
    expect(result).toBeNull();
    expect(global.alert).toHaveBeenCalledWith('Введите координаты в формате: широта, долгота');
  });

  it('should return null and alert for invalid latitude', () => {
    const input = '100.0, 50.0'; // latitude > 90
    const result = validateLocation(input);
    expect(result).toBeNull();
    expect(global.alert).toHaveBeenCalledWith('Широта должна быть от -90 до 90, долгота — от -180 до 180');
  });

  it('should return null and alert for invalid longitude', () => {
    const input = '45.0, 200.0'; // longitude > 180
    const result = validateLocation(input);
    expect(result).toBeNull();
    expect(global.alert).toHaveBeenCalledWith('Широта должна быть от -90 до 90, долгота — от -180 до 180');
  });
});