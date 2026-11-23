export type VehicleKind = 'bike' | 'scooty';

export interface VehicleModel {
  kind: VehicleKind;
  brand: string;
  model: string;
  slug: string;
  engine: string;
  segment: string;
}

export const slugify = (value: string) => value.toLowerCase().trim()
  .replace(/&/g, 'and').replace(/\+/g, ' plus ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const bikeCatalog: Array<[string, Array<[string, string, string]>]> = [
  ['Hero', [
    ['Splendor Plus', '97.2 cc', 'Commuter'], ['HF Deluxe', '97.2 cc', 'Commuter'], ['Glamour', '124.7 cc', 'Commuter'],
    ['Xtreme 125R', '124.7 cc', 'Street'], ['Xtreme 160R', '163 cc', 'Street'], ['Karizma XMR', '210 cc', 'Sport'],
    ['Mavrick 440', '440 cc', 'Roadster'], ['XPulse 200 4V', '199.6 cc', 'Adventure'], ['XPulse 210', '210 cc', 'Adventure'], ['Xtreme 200S 4V', '199.6 cc', 'Sport'],
  ]],
  ['Honda', [
    ['Shine 100', '98.98 cc', 'Commuter'], ['SP 125', '123.94 cc', 'Commuter'], ['Shine 125', '123.94 cc', 'Commuter'],
    ['Unicorn', '162.7 cc', 'Commuter'], ['Hornet 2.0', '184.4 cc', 'Street'], ['CB200X', '184.4 cc', 'Adventure'],
    ['Hness CB350', '348.36 cc', 'Roadster'], ['CB350RS', '348.36 cc', 'Roadster'], ['CB300R', '286 cc', 'Street'], ['CB300F', '293.5 cc', 'Street'], ['CB650R', '649 cc', 'Street'], ['NX500', '471 cc', 'Adventure'], ['XL750 Transalp', '755 cc', 'Adventure'],
  ]],
  ['TVS', [
    ['Sport', '109.7 cc', 'Commuter'], ['Radeon', '109.7 cc', 'Commuter'], ['Star City Plus', '109.7 cc', 'Commuter'],
    ['Raider 125', '124.8 cc', 'Street'], ['Apache RTR 160', '159.7 cc', 'Street'], ['Apache RTR 180', '177.4 cc', 'Street'],
    ['Apache RTR 200 4V', '197.75 cc', 'Street'], ['Apache RTR 160 4V', '159.7 cc', 'Street'], ['Ronin', '225.9 cc', 'Roadster'], ['Apache RR 310', '312 cc', 'Sport'], ['Apache RTR 310', '312 cc', 'Street'],
  ]],
  ['Bajaj', [
    ['Platina 100', '102 cc', 'Commuter'], ['CT 110X', '115 cc', 'Commuter'], ['Pulsar 125', '124.4 cc', 'Street'],
    ['Pulsar N150', '149.68 cc', 'Street'], ['Pulsar NS160', '160.3 cc', 'Street'], ['Pulsar NS200', '199.5 cc', 'Street'],
    ['Pulsar RS200', '199.5 cc', 'Sport'], ['Dominar 250', '248.8 cc', 'Touring'], ['Dominar 400', '373.3 cc', 'Touring'], ['Avenger 220', '220 cc', 'Cruiser'], ['Pulsar NS400Z', '373 cc', 'Street'], ['Pulsar F250', '249 cc', 'Sport'],
  ]],
  ['Suzuki', [
    ['Gixxer', '155 cc', 'Street'], ['Gixxer SF', '155 cc', 'Sport'], ['Gixxer 250', '249 cc', 'Street'], ['V-Strom SX', '249 cc', 'Adventure'], ['V-Strom 800 DE', '776 cc', 'Adventure'], ['Hayabusa', '1340 cc', 'Sport'],
  ]],
  ['Yamaha', [
    ['FZ-S FI', '149 cc', 'Street'], ['MT-15', '155 cc', 'Street'], ['R15 V4', '155 cc', 'Sport'], ['R3', '321 cc', 'Sport'], ['FZ-X', '149 cc', 'Neo-retro'], ['FZ25', '249 cc', 'Street'], ['R15S', '155 cc', 'Sport'],
  ]],
  ['Royal Enfield', [
    ['Hunter 350', '349 cc', 'Roadster'], ['Classic 350', '349 cc', 'Classic'], ['Bullet 350', '349 cc', 'Classic'], ['Meteor 350', '349 cc', 'Cruiser'],
    ['Himalayan 450', '452 cc', 'Adventure'], ['Guerrilla 450', '452 cc', 'Roadster'], ['Scram 411', '411 cc', 'Scrambler'],
    ['Interceptor 650', '648 cc', 'Roadster'], ['Continental GT 650', '648 cc', 'Cafe racer'], ['Super Meteor 650', '648 cc', 'Cruiser'], ['Shotgun 650', '648 cc', 'Roadster'], ['Classic 650', '648 cc', 'Classic'], ['Goan Classic 350', '349 cc', 'Classic'],
  ]],
  ['KTM', [
    ['125 Duke', '124.7 cc', 'Street'], ['200 Duke', '199.5 cc', 'Street'], ['250 Duke', '249 cc', 'Street'], ['390 Duke', '398.7 cc', 'Street'],
    ['RC 200', '199.5 cc', 'Sport'], ['RC 390', '373 cc', 'Sport'], ['390 Adventure', '398.7 cc', 'Adventure'], ['390 Enduro R', '398.7 cc', 'Enduro'],
  ]],
  ['BMW Motorrad', [
    ['G 310 R', '313 cc', 'Street'], ['G 310 GS', '313 cc', 'Adventure'], ['G 310 RR', '313 cc', 'Sport'], ['F 900 GS', '895 cc', 'Adventure'], ['S 1000 RR', '999 cc', 'Sport'],
  ]],
  ['Kawasaki', [
    ['Ninja 300', '296 cc', 'Sport'], ['Ninja 500', '451 cc', 'Sport'], ['Ninja 650', '649 cc', 'Sport'], ['Z650', '649 cc', 'Street'], ['Z900', '948 cc', 'Street'], ['Ninja ZX-10R', '998 cc', 'Sport'], ['Versys 650', '649 cc', 'Adventure'],
  ]],
  ['Triumph', [
    ['Speed 400', '398 cc', 'Roadster'], ['Scrambler 400 X', '398 cc', 'Scrambler'], ['Speed T4', '398 cc', 'Roadster'], ['Trident 660', '660 cc', 'Roadster'], ['Tiger 900', '888 cc', 'Adventure'], ['Bonneville T120', '1200 cc', 'Classic'],
  ]],
  ['Jawa', [['42', '294 cc', 'Roadster'], ['42 Bobber', '334 cc', 'Bobber'], ['Perak', '334 cc', 'Bobber']]],
  ['Yezdi', [['Roadster', '334 cc', 'Roadster'], ['Adventure', '334 cc', 'Adventure'], ['Scrambler', '334 cc', 'Scrambler']]],
  ['Harley-Davidson', [['X440', '440 cc', 'Roadster'], ['Nightster', '975 cc', 'Cruiser']]],
  ['Ducati', [['Scrambler Icon', '803 cc', 'Scrambler'], ['Monster', '937 cc', 'Naked'], ['Panigale V2', '955 cc', 'Sport'], ['Panigale V4', '1103 cc', 'Sport'], ['Multistrada V2', '937 cc', 'Adventure']]],
  ['Benelli', [['TRK 502', '500 cc', 'Adventure'], ['502C', '500 cc', 'Cruiser']]],
  ['Aprilia', [['RS 457', '457 cc', 'Sport'], ['Tuono 457', '457 cc', 'Street']]],
  ['Husqvarna', [['Svartpilen 401', '399 cc', 'Roadster']]],
  ['Indian Motorcycle', [['Scout', '1133 cc', 'Cruiser'], ['Chief', '1890 cc', 'Cruiser'], ['FTR', '1203 cc', 'Street']]],
  ['Revolt', [['RV400', 'Electric', 'Electric motorcycle']]],
];

const scootyCatalog: Array<[string, Array<[string, string, string]>]> = [
  ['Honda', [['Activa 6G', '109.51 cc', 'Family scooter'], ['Activa 125', '123.92 cc', 'Family scooter'], ['Dio', '109.51 cc', 'Sporty scooter'], ['Dio 125', '123.92 cc', 'Sporty scooter'], ['Activa e', 'Electric', 'Electric scooter'], ['QC1', 'Electric', 'Electric scooter']]],
  ['TVS', [['Jupiter', '113.3 cc', 'Family scooter'], ['Jupiter 125', '124.8 cc', 'Family scooter'], ['Ntorq 125', '124.8 cc', 'Sport scooter'], ['Zest 110', '109.7 cc', 'Lightweight scooter'], ['iQube', 'Electric', 'Electric scooter'], ['iQube ST', 'Electric', 'Electric scooter'], ['X', 'Electric', 'Electric scooter']]],
  ['Suzuki', [['Access 125', '124 cc', 'Family scooter'], ['Burgman Street', '124 cc', 'Maxi scooter'], ['Burgman Street EX', '124 cc', 'Maxi scooter'], ['Avenis 125', '124 cc', 'Sport scooter']]],
  ['Yamaha', [['RayZR 125', '125 cc', 'Sport scooter'], ['Fascino 125', '125 cc', 'Retro scooter'], ['Aerox 155', '155 cc', 'Maxi scooter']]],
  ['Hero', [['Destini 125', '124.6 cc', 'Family scooter'], ['Pleasure Plus', '110.9 cc', 'Lightweight scooter'], ['Xoom 110', '110.9 cc', 'Sport scooter'], ['Xoom 125', '124.6 cc', 'Sport scooter'], ['Xoom 160', '156 cc', 'Maxi scooter']]],
  ['Ather', [['450X', 'Electric', 'Electric scooter'], ['450S', 'Electric', 'Electric scooter'], ['450 Apex', 'Electric', 'Performance electric scooter'], ['Rizta', 'Electric', 'Family electric scooter'], ['Rizta Z', 'Electric', 'Family electric scooter']]],
  ['Ola Electric', [['S1 Pro', 'Electric', 'Electric scooter'], ['S1 Pro Gen 3', 'Electric', 'Electric scooter'], ['S1 X', 'Electric', 'Electric scooter'], ['S1 X+', 'Electric', 'Electric scooter'], ['S1 Air', 'Electric', 'Electric scooter']]],
  ['Bajaj', [['Chetak', 'Electric', 'Electric scooter'], ['Chetak 2903', 'Electric', 'Electric scooter'], ['Chetak 3501', 'Electric', 'Electric scooter'], ['Chetak 3502', 'Electric', 'Electric scooter']]],
  ['Vespa', [['VXL 125', '125 cc', 'Premium scooter'], ['VXL 150', '150 cc', 'Premium scooter'], ['SXL 125', '125 cc', 'Premium scooter'], ['ZX 125', '125 cc', 'Premium scooter']]],
  ['Aprilia', [['SR 125', '125 cc', 'Sport scooter'], ['SR 160', '160 cc', 'Sport scooter'], ['SXR 160', '160 cc', 'Maxi scooter'], ['SR 175', '174 cc', 'Sport scooter']]],
  ['Okinawa', [['Praise Pro', 'Electric', 'Electric scooter'], ['iPraise+', 'Electric', 'Electric scooter'], ['Ridge+', 'Electric', 'Electric scooter'], ['Lite', 'Electric', 'Lightweight electric scooter']]],
  ['Ampere', [['Magnus EX', 'Electric', 'Electric scooter'], ['Nexus', 'Electric', 'Family electric scooter'], ['Reo', 'Electric', 'Lightweight electric scooter'], ['Zeal EX', 'Electric', 'Electric scooter']]],
  ['Vida', [['V2', 'Electric', 'Electric scooter'], ['V1 Pro', 'Electric', 'Electric scooter']]],
  ['River', [['Indie', 'Electric', 'Electric scooter']]],
  ['Simple Energy', [['One', 'Electric', 'Electric scooter']]],
  ['Kinetic Green', [['Zing', 'Electric', 'Electric scooter']]],
  ['BGauss', [['RUV 350', 'Electric', 'Electric scooter']]],
];

const buildModels = (kind: VehicleKind, groups: Array<[string, Array<[string, string, string]>]>): VehicleModel[] =>
  groups.flatMap(([brand, models]) => models.map(([model, engine, segment]) => ({
    kind, brand, model, engine, segment, slug: slugify(model),
  })));

export const vehicleModels: VehicleModel[] = [
  ...buildModels('bike', bikeCatalog),
  ...buildModels('scooty', scootyCatalog),
];

export const vehicleBrands = Array.from(new Set(vehicleModels.map((item) => item.brand)));

export const modelPath = (item: VehicleModel) =>
  `/${item.kind}-service/${slugify(item.brand)}/${item.slug}`;

const brandAliases: Record<string, string> = { 'BMW': 'BMW Motorrad', 'Harley Davidson': 'Harley-Davidson', 'Indian': 'Indian Motorcycle', 'Bajaj Chetak': 'Bajaj' };
export const brandPath = (brand: string) => `/two-wheeler-service/${slugify(brandAliases[brand] || brand)}`;

export const findVehicleModel = (kind: VehicleKind, brandSlug: string, modelSlug: string) =>
  vehicleModels.find((item) => item.kind === kind && slugify(item.brand) === brandSlug && item.slug === modelSlug);

export const findBrandModels = (brandSlug: string) =>
  vehicleModels.filter((item) => slugify(item.brand) === brandSlug);

export const categoryPath = (kind: VehicleKind) => `/${kind}-service`;
