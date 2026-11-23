import inspectionChecklistImage from '../images/inspection-checklist.png';
import engineOilImage from '../images/engine-oil.png';
import motorcycleBrakeImage from '../images/motorcycle-brake.png';
import overheatingImage from '../images/overheating.png';
import scooterNotStartImage from '../images/Scooter not start.png';
import absImage from '../images/abs.png';
import electricScooterBatteryImage from '../images/Electric Scooter Battery and Charging Care A Safe Owners Guide.png';
import fuelEfficiencyImage from '../images/Motorcycle Fuel Efficiency Maintenance Checks That Matter.png';
import sparePartsImage from '../images/How to Choose the Right Motorcycle Spare Parts.png';
import clutchSlippingImage from '../images/Motorcycle Clutch Slipping Symptoms, Causes and Next Steps.png';
import tyreSafetyImage from '../images/Motorcycle Tyre Pressure and Tread A Rider’s Safety Guide.png';
import monsoonMaintenanceImage from '../images/Monsoon Motorcycle Maintenance for Delhi NCR Riders..png';
import motorcycleBatteryImage from '../images/Motorcycle Battery Care and Common Starting Problems..png';
import scooterCvtImage from '../images/Scooter CVT Belt Problems Symptoms and Inspection Tips.png';
import motorcycleChainImage from '../images/Motorcycle Chain Cleaning in the Workshop.png';

export interface BlogSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BlogPostData {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  imageAlt: string;
  image: string;
  intro: string;
  sections: BlogSection[];
  takeaway: string;
}

export const blogPosts: BlogPostData[] = [
  {
    slug: 'motorcycle-pre-ride-inspection-checklist',
    title: 'A Practical Motorcycle Inspection Checklist Before a Long Ride',
    excerpt: 'A simple pre-ride routine for tyres, brakes, lights, chain, fluids and documents before leaving Delhi NCR.',
    category: 'Bike maintenance', readTime: '5 min read', imageAlt: 'Motorcycle being checked before a long ride', image: inspectionChecklistImage,
    intro: 'A few minutes of inspection can help you spot obvious problems before a long ride. This checklist is a practical starting point for everyday motorcycles and touring bikes; your owner’s manual remains the final reference for model-specific checks.',
    sections: [
      { heading: 'Start with tyres and wheels', paragraphs: ['Check both tyres for visible cuts, embedded objects, uneven wear and damage around the sidewalls. Measure pressure when the tyres are cold and use the pressure recommended by the manufacturer for your load and riding conditions.', 'Look for unusual wheel play or fresh damage around the rims. If a tyre is losing pressure repeatedly, do not treat frequent top-ups as a repair.'] },
      { heading: 'Check brakes, lights and controls', paragraphs: ['Apply the front and rear brakes separately while stationary. The levers and pedal should feel consistent. Look for fluid leaks, unusual noises and warning lights. Check the headlamp, tail lamp, indicators, horn and brake-light operation.', 'Make sure the throttle returns smoothly and the clutch lever has the free play specified for your motorcycle.'] },
      { heading: 'Inspect the chain and visible fluids', paragraphs: ['On chain-driven motorcycles, inspect slack and lubrication according to the owner’s manual. A chain that is too tight, too loose or has stiff links needs attention before a long journey.', 'Check engine oil and coolant levels only as described in the manual. Look underneath for fresh leaks and secure any loose bodywork or luggage.'] },
      { heading: 'Carry the essentials', paragraphs: ['Carry your licence, registration, insurance and required vehicle documents. Plan fuel stops, keep emergency contacts accessible and avoid starting a long ride when you are tired.'] },
    ],
    takeaway: 'If you notice a brake issue, tyre damage, fluid leak, unusual engine noise or unstable handling, get the motorcycle inspected before riding further.'
  },
  {
    slug: 'motorcycle-engine-oil-when-to-change',
    title: 'When Should You Change Motorcycle Engine Oil?',
    excerpt: 'Understand oil grades, service intervals, oil level checks and warning signs without relying on a one-size-fits-all kilometre rule.',
    category: 'Engine care', readTime: '5 min read', imageAlt: 'Motorcycle engine oil being checked during service', image: engineOilImage,
    intro: 'Engine oil lubricates moving parts, helps manage heat and carries contaminants towards the filter. The correct oil and replacement interval depend on the motorcycle, its engine design and the way it is used.',
    sections: [
      { heading: 'Follow the model’s service schedule', paragraphs: ['Use the oil specification and viscosity listed in the owner’s manual. Do not choose oil only because another rider uses it or because the bottle carries a familiar brand name.', 'The service schedule may use distance, time or both. Severe traffic, frequent short trips, dusty routes and heavy loads can make it sensible to discuss maintenance needs with a qualified technician.'] },
      { heading: 'Check the oil level correctly', paragraphs: ['Park the motorcycle on the surface and position specified by the manufacturer. Some models require the bike to be upright; others have a different checking procedure. Follow the manual rather than guessing from a universal method.', 'If the level drops repeatedly, look for leaks or possible oil consumption and arrange an inspection. Simply topping up without finding the cause can hide a developing issue.'] },
      { heading: 'Know the warning signs', paragraphs: ['Unusual engine noise, an oil-pressure warning, visible leakage or a sudden change in engine behaviour deserves prompt attention. Oil colour alone is not a reliable reason to extend or shorten a service interval.'] },
    ],
    takeaway: 'Use the manufacturer-approved oil grade and schedule for your exact model. Ask the service centre to record the oil specification and quantity used.'
  },
  {
    slug: 'motorcycle-brake-warning-signs',
    title: 'Motorcycle Brake Warning Signs Riders Should Never Ignore',
    excerpt: 'Squealing, vibration, a soft lever and fluid leaks can point to brake problems that need inspection.',
    category: 'Safety', readTime: '4 min read', imageAlt: 'Technician inspecting a motorcycle disc brake', image: motorcycleBrakeImage,
    intro: 'Brakes are safety-critical components. A change in lever feel, stopping response or sound should be checked rather than ignored, especially before commuting or riding at speed.',
    sections: [
      { heading: 'Listen and feel for changes', paragraphs: ['Persistent squealing, grinding, pulsing through the lever or vibration during braking can have several causes. Pad wear, disc condition, contamination and loose hardware are among the items a technician may inspect.', 'A lever that suddenly feels soft, travels unusually far or slowly sinks is a reason to stop riding and arrange a professional check.'] },
      { heading: 'Look for visible clues', paragraphs: ['Check for brake-fluid leaks around hoses, callipers and the master cylinder. Look for damaged hoses and obvious uneven pad wear where visible. Do not touch hot brake components after a ride.', 'Brake fluid absorbs moisture over time. Follow the replacement schedule and fluid specification in the owner’s manual.'] },
      { heading: 'Avoid temporary fixes', paragraphs: ['Do not spray lubricant near brake discs or pads. Do not continue riding because the warning sound disappears temporarily. Brake components should be cleaned, measured and replaced only using parts that meet the vehicle specification.'] },
    ],
    takeaway: 'If braking performance has changed, park the motorcycle safely and get the system inspected before riding again.'
  },
  {
    slug: 'motorcycle-chain-cleaning-lubrication-guide',
    title: 'How to Clean and Lubricate a Motorcycle Chain',
    excerpt: 'Learn what to inspect, how to avoid common chain-care mistakes and why the owner’s manual matters.',
    category: 'Bike maintenance', readTime: '5 min read', imageAlt: 'Motorcycle drive chain being cleaned', image: motorcycleChainImage,
    intro: 'A well-maintained drive chain helps transfer power smoothly. Cleaning and lubrication are straightforward tasks, but incorrect slack adjustment or unsafe cleaning methods can create problems.',
    sections: [
      { heading: 'Inspect before cleaning', paragraphs: ['Look for rust, tight links, damaged rollers, missing seals and uneven wear. Check chain slack at the position and measurement points described in your owner’s manual.', 'If the chain has damaged links or the sprocket teeth are hooked or badly worn, cleaning alone will not solve the problem.'] },
      { heading: 'Use products intended for the chain type', paragraphs: ['Choose a chain cleaner and lubricant compatible with your motorcycle’s chain and seals. Avoid harsh solvents unless the manufacturer specifically permits them.', 'Apply lubricant as directed, usually to the inner run so it can reach the rollers. Wipe away excess to reduce fling and dirt build-up.'] },
      { heading: 'Keep the process safe', paragraphs: ['Switch the engine off and secure the motorcycle properly. Never run the engine in gear to spin the rear wheel while cleaning. Keep fingers, cloths and tools away from pinch points.', 'After adjustment, verify alignment and axle fasteners using the correct procedure and torque values. If unsure, ask a trained mechanic.'] },
    ],
    takeaway: 'Chain slack, alignment and fastener torque are model-specific. Use the manual or have a technician complete the adjustment.'
  },
  {
    slug: 'scooter-cvt-belt-warning-signs',
    title: 'Scooter CVT Belt Problems: Symptoms and Inspection Tips',
    excerpt: 'A guide to belt noise, sluggish acceleration and vibration in automatic petrol scooters.',
    category: 'Scooter care', readTime: '5 min read', imageAlt: 'Automatic scooter transmission cover during inspection', image: scooterCvtImage,
    intro: 'Many automatic petrol scooters use a continuously variable transmission (CVT). The belt, rollers and clutch work together, and wear in this system can affect acceleration and smoothness.',
    sections: [
      { heading: 'Notice changes in acceleration', paragraphs: ['A scooter that revs more than usual but accelerates slowly, judders when moving away or feels inconsistent may need a CVT inspection. These symptoms can also have other causes, so diagnosis should not be based on sound alone.', 'A new rattling or scraping noise from the transmission cover should be checked, especially if it changes with speed.'] },
      { heading: 'Why belt condition matters', paragraphs: ['A worn or damaged belt can affect power delivery. Rollers, clutch shoes and the driven pulley may also need inspection depending on the model and service history.', 'Replacement intervals and inspection procedures differ between scooters. Use the maintenance schedule for the exact variant.'] },
      { heading: 'Avoid opening the transmission without the right tools', paragraphs: ['CVT assemblies use specific fasteners and tightening procedures. Incorrect assembly can cause damage or create a safety risk. Have the system inspected by a technician with the appropriate tools.'] },
    ],
    takeaway: 'Share the scooter model, year and symptoms before booking so the technician can understand the likely inspection area.'
  },
  {
    slug: 'motorcycle-battery-care-starting-issues',
    title: 'Motorcycle Battery Care and Common Starting Problems',
    excerpt: 'Understand weak cranking, dim lights, charging checks and the difference between battery and starter faults.',
    category: 'Electrical', readTime: '4 min read', imageAlt: 'Motorcycle battery terminals being inspected', image: motorcycleBatteryImage,
    intro: 'A slow starter does not always mean the battery needs replacement. Battery condition, charging output, terminals, wiring and starter components can all affect starting performance.',
    sections: [
      { heading: 'Watch for early symptoms', paragraphs: ['Slow cranking, dim lights at idle, a clicking sound or electrical resets can indicate a low battery or connection issue. Record when the symptom occurs, such as after the bike has been parked overnight or after a short ride.', 'If the battery case is swollen, leaking or unusually hot, do not continue using or charging it. Arrange a safe inspection.'] },
      { heading: 'Keep terminals clean and secure', paragraphs: ['Corrosion or loose battery connections can interrupt current flow. A technician can inspect the terminals, cables, earth connections and fuse condition.', 'Use only the battery type and rating specified for the model. Incorrect charging equipment can damage some battery chemistries.'] },
      { heading: 'Check the charging system', paragraphs: ['A battery that repeatedly becomes discharged may point to a charging-system issue. Testing should include the battery and the charging circuit rather than replacing parts by guesswork.'] },
    ],
    takeaway: 'If the bike repeatedly fails to start, request a battery and charging-system diagnosis before buying a replacement battery.'
  },
  {
    slug: 'monsoon-bike-maintenance-delhi-ncr',
    title: 'Monsoon Motorcycle Maintenance for Delhi NCR Riders',
    excerpt: 'Practical checks for water exposure, chain care, brakes, tyres and electrical connections during rainy months.',
    category: 'Seasonal care', readTime: '5 min read', imageAlt: 'Motorcycle parked after rain in an urban street', image: monsoonMaintenanceImage,
    intro: 'Rain, standing water and damp parking conditions can accelerate corrosion and expose weak electrical connections. A few sensible habits can help protect a motorcycle during the monsoon.',
    sections: [
      { heading: 'Clean and dry the motorcycle after wet rides', paragraphs: ['Rinse away mud and road grime using a gentle method. Avoid directing high-pressure water at electrical connectors, bearings, seals and instrument panels.', 'Dry exposed metal parts and check for trapped mud around the chain, brakes and wheel areas.'] },
      { heading: 'Pay extra attention to tyres and brakes', paragraphs: ['Wet roads reduce available grip. Check tread condition and tyre pressure, and avoid sudden braking or sharp acceleration on slippery surfaces.', 'If brakes feel different after water exposure, allow them to dry and have persistent noise, vibration or reduced performance inspected.'] },
      { heading: 'Protect the chain and electrical connections', paragraphs: ['Clean and lubricate the chain using compatible products and the manufacturer’s procedure. Inspect visible wiring and connectors for damage or corrosion.', 'If the motorcycle has been submerged or water entered the air intake or electrical system, do not repeatedly try to start it. Arrange a proper inspection.'] },
    ],
    takeaway: 'After flooding or deep-water exposure, do not restart the motorcycle until a technician has checked for water ingress and possible engine damage.'
  },
  {
    slug: 'motorcycle-engine-overheating-causes',
    title: 'Why Is Your Motorcycle Engine Overheating?',
    excerpt: 'Understand common warning signs and what to do if the temperature rises during a ride.',
    category: 'Engine care', readTime: '5 min read', imageAlt: 'Motorcycle engine and radiator area being inspected', image: overheatingImage,
    intro: 'Engine temperature depends on the cooling design, traffic conditions, ambient temperature and maintenance. A warning light or unusual heat should be treated according to the manufacturer’s instructions.',
    sections: [
      { heading: 'Recognise the warning signs', paragraphs: ['A temperature warning, steam, coolant smell, sudden loss of power or repeated overheating should not be ignored. Air-cooled and liquid-cooled motorcycles behave differently, so use the model manual for warning thresholds and safe steps.', 'Some heat around the engine is normal, especially in slow traffic. A warning indicator or change in performance is different and deserves attention.'] },
      { heading: 'Possible inspection areas', paragraphs: ['On liquid-cooled models, a technician may inspect coolant level, leaks, radiator condition, fan operation, hoses and thermostat function. On air-cooled engines, airflow obstruction, oil condition and engine tuning may be relevant.', 'Low coolant or oil should not be topped up blindly without checking why the level changed.'] },
      { heading: 'What to do when the warning appears', paragraphs: ['Move to a safe place and follow the owner’s manual. Do not open a hot radiator cap. If the engine is steaming or the warning persists, switch off when safe and arrange assistance rather than continuing the journey.'] },
    ],
    takeaway: 'Never open a hot cooling system. Persistent overheating needs diagnosis before the motorcycle returns to regular use.'
  },
  {
    slug: 'motorcycle-tyre-pressure-tread-safety',
    title: 'Motorcycle Tyre Pressure and Tread: A Rider’s Safety Guide',
    excerpt: 'How to check cold tyre pressure, spot uneven wear and understand when a tyre needs professional attention.',
    category: 'Safety', readTime: '4 min read', imageAlt: 'Motorcycle tyre tread and pressure inspection', image: tyreSafetyImage,
    intro: 'Tyres are the only contact between a motorcycle and the road. Correct pressure and sound tread condition influence handling, braking and comfort.',
    sections: [
      { heading: 'Use the manufacturer’s pressure figures', paragraphs: ['Check pressure when tyres are cold and use the figures specified for your model and load. The number printed on the tyre is not necessarily the recommended running pressure for the motorcycle.', 'A reliable gauge is more useful than judging pressure by pressing the tyre with your hand.'] },
      { heading: 'Inspect tread and sidewalls', paragraphs: ['Look for cuts, bulges, cracks, embedded objects and uneven wear. Check the tread-wear indicators and follow local legal requirements and manufacturer guidance.', 'A bulge, exposed cord or deep cut requires prompt professional attention. Do not attempt to repair a sidewall puncture with a temporary plug.'] },
      { heading: 'Understand unusual wear', paragraphs: ['Wear concentrated in the centre or edges can have several causes, including pressure, load, riding style, suspension condition or wheel alignment. A technician can inspect the full setup rather than changing pressure at random.'] },
    ],
    takeaway: 'Check pressure regularly and replace damaged or worn tyres before they compromise safe riding.'
  },
  {
    slug: 'scooter-not-starting-troubleshooting',
    title: 'Scooter Not Starting? Checks to Make Before Booking a Repair',
    excerpt: 'A safe first look at battery, brake switch, side stand, fuel and warning indicators when a scooter refuses to start.',
    category: 'Scooter care', readTime: '4 min read', imageAlt: 'Scooter handlebar and ignition controls', image: scooterNotStartImage,
    intro: 'A scooter that does not start may have a simple control interlock issue or a fault that needs diagnosis. The correct checks depend on whether it is a petrol or electric scooter.',
    sections: [
      { heading: 'For petrol scooters', paragraphs: ['Check the fuel level, key position, engine-stop switch if fitted, side-stand position and brake lever operation. Many scooters require a brake lever to be applied before the starter works.', 'Listen for the starter sound. A click, slow crank or complete silence can point to different electrical or starter-system conditions.'] },
      { heading: 'For electric scooters', paragraphs: ['Check the display for warning messages, battery state and charging status. Use the manufacturer-approved charger and avoid opening battery or high-voltage components.', 'If the scooter reports a battery, controller or system fault, record the message and contact an authorised or suitably qualified service provider.'] },
      { heading: 'Avoid repeated forced starts', paragraphs: ['Repeatedly holding the starter or trying improvised wiring can worsen a fault. If there is a burning smell, smoke, overheating or visible damage, stop and arrange inspection.'] },
    ],
    takeaway: 'Tell the mechanic whether the starter is silent, clicks, cranks slowly or turns normally without the engine starting. That detail helps narrow the diagnosis.'
  },
  {
    slug: 'motorcycle-clutch-slipping-symptoms',
    title: 'Motorcycle Clutch Slipping: Symptoms, Causes and Next Steps',
    excerpt: 'Learn how clutch slip feels, what else can cause poor acceleration and why adjustment should follow the manual.',
    category: 'Transmission', readTime: '4 min read', imageAlt: 'Motorcycle clutch lever and handlebar assembly', image: clutchSlippingImage,
    intro: 'A slipping clutch can make engine speed rise without a matching increase in road speed. It may affect acceleration, control and component life if ignored.',
    sections: [
      { heading: 'How clutch slip can feel', paragraphs: ['You may notice engine rpm increasing under load while the motorcycle gains speed slowly. The symptom may be more obvious during acceleration or uphill riding.', 'Poor acceleration can also be caused by fuel, ignition, airflow or drivetrain problems. A proper diagnosis is needed before replacing clutch parts.'] },
      { heading: 'Check clutch free play', paragraphs: ['Incorrect cable adjustment can affect clutch engagement. Use the free-play specification and adjustment procedure in the owner’s manual. Hydraulic clutch systems have different inspection needs.', 'A burning smell, sudden loss of drive or severe slip calls for stopping safely and arranging an inspection.'] },
      { heading: 'What a technician may inspect', paragraphs: ['The clutch plates, springs, cable or hydraulic system, oil specification and operating mechanism may be checked. Some motorcycles require a specific oil standard for wet clutches.'] },
    ],
    takeaway: 'Do not keep accelerating through clutch slip. Share the rpm and speed symptoms with the mechanic and have the clutch system checked.'
  },
  {
    slug: 'genuine-motorcycle-spare-parts-guide',
    title: 'How to Choose the Right Motorcycle Spare Parts',
    excerpt: 'A practical guide to part compatibility, invoices, packaging, warranty terms and avoiding guesswork.',
    category: 'Ownership', readTime: '5 min read', imageAlt: 'Motorcycle replacement parts arranged on a workshop bench', image: sparePartsImage,
    intro: 'A replacement part should match the motorcycle’s exact model, variant and production requirements. Similar-looking parts are not automatically interchangeable.',
    sections: [
      { heading: 'Confirm compatibility first', paragraphs: ['Use the vehicle identification details and the part number where available. Ask the service provider to confirm fitment before installation, especially for brakes, suspension, electrical and engine components.', 'For model-year changes, a part that fits one generation may not fit another.'] },
      { heading: 'Ask what is being installed', paragraphs: ['Request the part name, brand or manufacturer, quantity and price on the estimate or invoice. Keep packaging or part labels where practical, and ask whether the removed component can be shown to you.', 'For safety-critical components, avoid unknown or visibly poor-quality parts. Follow manufacturer specifications.'] },
      { heading: 'Understand warranty and returns', paragraphs: ['Ask who provides the part warranty, what it covers and what documents are needed for a claim. Labour coverage and parts warranty may be separate.', 'Do not assume every component has the same warranty period or return conditions.'] },
    ],
    takeaway: 'Get the part identity, price and warranty terms recorded before approving replacement work.'
  },
  {
    slug: 'improve-motorcycle-fuel-efficiency-maintenance',
    title: 'Motorcycle Fuel Efficiency: Maintenance Checks That Matter',
    excerpt: 'Tyres, air filters, chain condition, brakes and riding habits can all affect fuel use.',
    category: 'Riding tips', readTime: '5 min read', imageAlt: 'Motorcycle being prepared for a daily commute', image: fuelEfficiencyImage,
    intro: 'Fuel efficiency depends on the motorcycle, route, load, traffic and riding style. Maintenance cannot guarantee a particular mileage figure, but it can help prevent avoidable losses caused by poor condition.',
    sections: [
      { heading: 'Keep tyres and drivetrain in good condition', paragraphs: ['Use the recommended tyre pressure and inspect for damage or uneven wear. On chain-driven bikes, maintain correct slack and lubrication as specified by the manufacturer.', 'A dragging brake or misaligned wheel can create resistance. If the bike feels difficult to push or a wheel becomes unusually hot, arrange an inspection.'] },
      { heading: 'Follow the air-filter and spark-plug schedule', paragraphs: ['A clogged air filter or worn ignition component can affect engine operation. Cleaning and replacement intervals vary by model and riding environment, so use the service schedule rather than a generic kilometre rule.', 'Use the correct spark plug specification and gap for your motorcycle.'] },
      { heading: 'Adopt smoother riding habits', paragraphs: ['Avoid unnecessary hard acceleration, excessive idling and carrying unused heavy loads. Select gears appropriate to road speed and avoid lugging the engine.', 'If fuel use changes suddenly, check for leaks, warning lights and mechanical symptoms instead of assuming riding style is the only cause.'] },
    ],
    takeaway: 'Track fuel use over several comparable refills. A sudden unexplained change is worth discussing during a service inspection.'
  },
  {
    slug: 'abs-warning-light-motorcycle',
    title: 'What Does the ABS Warning Light on a Motorcycle Mean?',
    excerpt: 'Understand the self-check process, warning light behaviour and why ABS faults need a proper scan and inspection.',
    category: 'Safety', readTime: '4 min read', imageAlt: 'Motorcycle ABS wheel sensor and brake disc', image: absImage,
    intro: 'The anti-lock braking system (ABS) helps prevent wheel lock under certain braking conditions. A warning light can be part of the normal start-up check, but a light that stays on or appears while riding needs attention.',
    sections: [
      { heading: 'Know the normal self-check', paragraphs: ['Many motorcycles illuminate the ABS indicator when the ignition is switched on. It may go out after the motorcycle starts moving, according to the model’s design. Check the owner’s manual for the exact behaviour.', 'If the light remains on after the expected self-check, the system may have detected a fault.'] },
      { heading: 'Possible inspection points', paragraphs: ['A technician may inspect wheel-speed sensors, sensor rings, wiring, connectors, battery voltage, brake components and stored diagnostic codes. Damage or dirt around a sensor can affect readings.', 'Do not disconnect sensors or attempt to bypass the warning.'] },
      { heading: 'Ride cautiously and get it checked', paragraphs: ['If the ABS warning remains on, the conventional braking system may still operate but the anti-lock function may not be available. Follow the manual, avoid hard riding and arrange a prompt inspection.'] },
    ],
    takeaway: 'Treat a persistent ABS warning as a safety issue. Do not assume the system is working normally until the fault is diagnosed.'
  },
  {
    slug: 'electric-scooter-battery-charging-care',
    title: 'Electric Scooter Battery and Charging Care: A Safe Owner’s Guide',
    excerpt: 'Everyday charging habits, warning messages and safe steps when an electric scooter will not charge.',
    category: 'Electric scooters', readTime: '5 min read', imageAlt: 'Electric scooter connected to its charging cable', image: electricScooterBatteryImage,
    intro: 'Electric scooters use high-energy battery systems and model-specific charging controls. Follow the manufacturer’s instructions and do not open battery packs or high-voltage components yourself.',
    sections: [
      { heading: 'Use the approved charging equipment', paragraphs: ['Use the charger and electrical supply recommended for your scooter. Keep the charging area dry, ventilated and away from combustible materials. Inspect the cable and connector for visible damage before use.', 'Do not use a damaged charger, extension arrangement or connector that becomes unusually hot.'] },
      { heading: 'Respond to warnings and unusual heat', paragraphs: ['Record any battery, temperature or charging message shown on the display. If you notice smoke, swelling, a burning smell or unusual heat, stop charging if safe, move away and contact the manufacturer or emergency services as appropriate.', 'Never puncture, dismantle or attempt to repair a battery pack yourself.'] },
      { heading: 'Understand range changes', paragraphs: ['Range can vary with speed, load, terrain, temperature, tyre pressure and battery condition. Compare similar journeys before concluding that the battery has degraded.', 'If charging stops unexpectedly or range drops sharply, arrange a diagnostic check through a suitably qualified service channel.'] },
    ],
    takeaway: 'Battery pack and high-voltage repairs should be handled only by trained and properly equipped technicians.'
  },
];

export const getBlogPost = (slug: string) => blogPosts.find((post) => post.slug === slug);
