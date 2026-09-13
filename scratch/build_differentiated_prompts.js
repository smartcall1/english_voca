const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = 'D:/Codes/english_voca';
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'comics.js'), 'utf8'), ctx);
const comics = ctx.window.COMICS;

const visualDirections = {
  1: {
    theme: "First Greeting & Introduction in Classroom",
    p1: "Eye-level wide shot. Luca in yellow T-shirt stands at the open wooden door of the bright classroom, smiling and waving a welcoming hand to Aiden who enters wearing a blue T-shirt and carrying a blue backpack.",
    p2: "Medium shot. Aiden accidentally drops his blue backpack near the classroom entrance rug; a couple of notebooks and a pencil case tumble out. Aiden looks surprised with open palms.",
    p3: "Low-angle warm close-up. Luca kindly crouches down and picks up a bright red hardcover book, gently handing it back to Aiden with a friendly, reassuring smile.",
    p4: "Over-the-shoulder medium shot. Both boys sit side by side at a sunny wooden desk, introducing each other with cheerful smiles while koala sits contentedly between them."
  },
  2: {
    theme: "Desks, Chairs & Helping Each Other",
    p1: "Medium shot inside classroom. Luca stands beside an empty blue wooden chair at their shared table, pointing to the chair with a bright welcoming smile, inviting Aiden to sit.",
    p2: "Low-angle shot focused on the floor. A handful of colorful wooden pencils slip off the wooden desk edge and scatter across the classroom floor near Luca's sneakers.",
    p3: "Playful floor-level shot. Aiden and Luca crouch on the rug collecting the fallen pencils, while the tiny fluffy koala with green scarf adorably holds a yellow pencil in its paws to help.",
    p4: "Close-up desk view. Both boys sit happily side by side at the table, their pencils neatly placed in a wooden pen holder, proudly admiring their freshly organized shared desk."
  },
  3: {
    theme: "Classroom Supplies Treasure: Ruler & Red Rubber",
    p1: "Medium-wide shot. Aiden cheerfully walks past colorful cubbyholes and classroom shelves, proudly holding his blue school bag.",
    p2: "Dynamic floor-level shot. Aiden's unzipped bag tips over, spilling a distinct long yellow plastic ruler, a pencil, and a notebook onto the floor.",
    p3: "Close-up shot of hands. Luca's hands pick up a distinct bright red rectangular eraser (rubber) and a storybook from the floor, handing them carefully to Aiden.",
    p4: "Top-down / high-angle desk view. Aiden uses the yellow ruler to draw straight lines on large drawing paper while Luca colors with crayons, surrounded by their organized stationery."
  },
  4: {
    theme: "Listening to Teacher & Storybook Reading",
    p1: "Side profile shot. Aiden and Luca stand near the slightly open classroom door, peeking into the cozy classroom reading nook with curious sparkling eyes.",
    p2: "Medium shot. A kind female teacher standing near a chalkboard with chalk drawings gently gestures for quiet, and Aiden and Luca stand attentively listening with their bags neatly set down.",
    p3: "Cozy eye-level shot on the classroom rug. Aiden and Luca sit cross-legged on comfortable cushions, holding an open large illustrated picture book featuring Australian animals.",
    p4: "Close-up on desktop paper. Aiden's hand carefully writes letters on drawing paper with a pencil next to Luca's cute drawing of a smiling koala face."
  },
  5: {
    theme: "Morning Lesson & Sharing Crayons Fairly",
    p1: "Wide shot of front classroom. The teacher writes a sunny morning greeting on the green chalkboard, as Aiden and Luca sit at their desk raising eager hands to start the lesson.",
    p2: "Medium shot. Luca reaches out his hand across the desk asking Aiden for assistance, gesturing towards a craft project they are building together.",
    p3: "Eye-level interaction shot. Aiden politely offers a cardboard sheet and waits his turn with patient smile, showing gentle classroom manners.",
    p4: "Warm close-up. Luca and Aiden share an open 12-pack crayon tin placed right between them, each picking a different color with happy friendly smiles."
  },
  6: {
    theme: "Playground Discovery & Vibrant Colors",
    p1: "Wide sunlit playground shot. Luca points excitedly towards a bright red swing set and a blue swing set in a lush outdoor playground.",
    p2: "Medium shot near green lawn. Aiden looks over at a curly bright yellow slide standing tall on soft green grass under Australian sunshine.",
    p3: "Full-body fashion detail shot. Aiden steps off the swing platform, looking at Luca who wears a cool purple sun hat and bright pink sneakers.",
    p4: "Dynamic action shot. Both boys joyfully run across the playground together towards the climbing frames with big bright smiles."
  },
  7: {
    theme: "Counting Numbers 1 to 10 on the Swings",
    p1: "Medium shot on swing. Aiden sits happily on the red rubber swing, holding up one and two fingers asking Luca for two minutes of swinging.",
    p2: "Close-up of Luca standing safely behind the white waiting boundary line, counting 'three, four, five' on his raised hand with fingers spread.",
    p3: "Eye-level transition shot. Aiden hops off the swing seat with a smile, stepping aside and gesturing to Luca: 'Six, seven, eight, your turn!'",
    p4: "Medium-wide celebratory shot. Luca swings high into the air as Aiden claps and cheers beside the swing frame, both beaming with joy."
  },
  8: {
    theme: "Playground Shapes: Circles, Poles & Round Balls",
    p1: "Dynamic low-angle shot. Luca grips the long braided ropes of the tall swing, swinging forward with energetic excitement.",
    p2: "Ground perspective shot. Aiden stands firmly inside a neat white painted circle marker on the playground rubber mulch, waiting his turn safely.",
    p3: "Eye-level supportive shot. Aiden puts both hands steadily on the tall metallic support pole of the swing frame, watching out for safety.",
    p4: "Wide colorful shot. Aiden and Luca look at colorful round rubber play balls and geometric climbing domes across the playground."
  },
  9: {
    theme: "Feelings & Patient Sharing on the Swings",
    p1: "Close-up expressive portrait. Aiden's face beams with thrilling excitement as the wind ruffles his hair while soaring on the swing.",
    p2: "Calm medium shot. Luca sits peacefully on a wooden bench nearby with hands folded on knees, showing relaxed, worry-free patience.",
    p3: "Warm eye-level interaction. Luca steps up to take the swing seat, looking gratefully into Aiden's eyes with a gentle appreciative nod.",
    p4: "Two-shot medium profile. Both boys stand side-by-side near the playground fence, looking proud and satisfied after taking turns."
  },
  10: {
    theme: "Big Playground Adventure & Ball Catch",
    p1: "Wide entrance shot. Luca waves his arm forward inviting Aiden onto the expansive playground lawn filled with colorful activity zones.",
    p2: "Full-body athletic shot. Aiden joyfully skips and jumps in mid-air over a small obstacle line with energetic agility.",
    p3: "Side-view action shot. Luca stands behind the swing, giving Aiden's back a gentle, steady push so he swings high toward the blue sky.",
    p4: "Dynamic mid-motion sports shot. Aiden throws a vibrant red rubber ball and Luca reaches out with open hands to catch it, laughing together."
  },
  11: {
    theme: "Kitchen Table Setting for Family",
    p1: "Medium kitchen shot. Aiden carries two clean ceramic plates with both hands, carefully walking from the kitchen counter toward the wooden dining table.",
    p2: "Top-down table setting shot. Luca delicately places silver spoons and forks beside checkered cloth placemats with neat precision.",
    p3: "Close-up detail shot. Aiden sets down a small pink toddler cup with two handles on the corner of the table for baby sister.",
    p4: "Proud medium-wide shot. Both boys stand proudly behind the beautifully set dining table decorated with napkins and plates, smiling at their work."
  },
  12: {
    theme: "Kitchen Floor & Window View",
    p1: "Wide shot through dining room doorway. Luca and Aiden enter the warm, brightly lit home kitchen with cozy wooden floors.",
    p2: "Foot-level / low-angle walking shot. Aiden carries a wooden breakfast tray, looking down at his feet to step carefully across the clean kitchen floor.",
    p3: "Eye-level window shot. Luca places bowls on the table right next to a sunny bay window that looks out onto green treetops and a blue house roof.",
    p4: "Medium doorway shot. Aiden stands at the kitchen door, cupping his hands around his mouth calling family members warmly to eat."
  },
  13: {
    theme: "Washing Hands & Dining Hygiene",
    p1: "Bathroom/sink close-up shot. Both boys stand on a wooden step stool at the sink, lathering white foamy soap between their hands under running water.",
    p2: "Medium shot. Luca hands a fluffy yellow cotton towel to Aiden so he can dry his hands completely.",
    p3: "Action cleanup shot. Aiden picks up a small plastic toy robot from the dining table and places it neatly onto an adjacent wooden wall shelf.",
    p4: "Wide dining room shot. The boys stand beside the spotless, gleaming dining table, ready for a clean and hygienic meal."
  },
  14: {
    theme: "Carrying Bowls Carefully with Both Hands",
    p1: "Close-up on hands. Aiden's two hands firmly grip the rim of a warm ceramic soup bowl, lifting it steadily with focused care.",
    p2: "Full-body walking shot. Luca walks slowly with a balanced glass of juice, keeping his eyes glued on the table surface ahead.",
    p3: "Side profile shot. Luca sits down at the table, smiling widely with mouth open in delight as Aiden sets down the steaming bowl.",
    p4: "Medium celebratory shot. Aiden wipes his hands on his apron and flexes his arms proudly, happy to be a strong kitchen helper."
  },
  15: {
    theme: "Dressing Tidy & Breakfast Uniform",
    p1: "Full-body portrait in dining room. Luca adjusts the collar of his clean crisp yellow polo shirt and smooth khaki shorts before sitting.",
    p2: "Medium dining shot. Aiden carefully rolls up the sleeves of his blue school shirt so soup doesn't splash onto his uniform.",
    p3: "Floor-level footwear shot. Aiden kicks off his outdoor shoes and slides his feet into soft cozy indoor slippers by the dining chair.",
    p4: "Medium-wide table shot. Both neatly dressed boys sit side-by-side with napkins on their laps, ready for a warm morning breakfast."
  },
  16: {
    theme: "Breakfast Feast in the Pillow Fort: Toast & Milk",
    p1: "Eye-level shot inside blanket tent. Golden morning light filters into a cozy bedroom fort built with blankets; Luca brings in a plate of toasted bread.",
    p2: "Close-up on breakfast tray. A wooden tray inside the pillow fort holds a freshly peeled boiled egg in an egg cup and a glass of creamy milk.",
    p3: "Pouring action shot. Aiden pours crunchy golden cereal flakes from a box into a large colorful ceramic bowl inside the fort.",
    p4: "Cozy interior shot. Both boys sit cross-legged on fluffy cushions, eating breakfast happily inside their secluded secret blanket fort."
  },
  17: {
    theme: "Fortress Lunchbox: Cheese & Chicken Sandwich",
    p1: "Medium shot inside fort. Aiden lays out clean wax paper on a wooden board inside the fort to assemble lunchbox sandwiches.",
    p2: "Close-up sandwich assembly shot. Luca carefully layers yellow cheddar cheese and sliced cooked chicken between slices of bread.",
    p3: "Safe handling shot. Aiden uses a butter knife with a rounded safety tip, placing the cutlery neatly beside the cutting board.",
    p4: "Warm interior celebratory shot. The two boys high-five each other inside the blanket fort over a platter of freshly cut triangle sandwiches."
  },
  18: {
    theme: "Fruit Basket Treasure: Apples & Sweet Berries",
    p1: "Medium shot entering fort. Luca crawls into the blanket den carrying a rustic wicker basket overflowing with red apples and ripe bananas.",
    p2: "Color-rich still life close-up. Shiny purple grapes and bright red strawberries are arranged artfully on a small wooden plate atop a pillow.",
    p3: "Sharing gesture shot. Aiden offers a crunchy orange carrot stick to Luca, who tilts his head smiling and choosing a snack.",
    p4: "Delighted close-up portrait. Both boys take big juicy bites out of vibrant red watermelon wedges, smiling with seeds visible on rind."
  },
  19: {
    theme: "Bedtime Tidying & Cosy Bed Preparation",
    p1: "Bathroom evening shot. Aiden brushes his teeth with a green toothbrush in front of a mirror while Luca washes his face with warm water.",
    p2: "Bedroom wide shot. Luca stacks plush pillows neatly onto the bed and Aiden folds a soft blue quilt, clearing the wooden floor.",
    p3: "Packing detail shot. Aiden packs his school notebook and pencil pouch into his blue backpack beside the bed, preparing for tomorrow.",
    p4: "Cozy bedtime scene. Both boys tuck into soft quilts under gentle warm nightstand lamp glow, ready for peaceful sleep."
  },
  20: {
    theme: "Pillow Fort Hide-and-Seek: Koala Clues",
    p1: "Curious exploration shot. Aiden peeks his head through the blanket flap of the fort, looking around for their missing koala friend.",
    p2: "Floor-level searching shot. Luca lifts a large striped bolster pillow and peeks underneath the quilt with focused playful eyes.",
    p3: "Discovery close-up shot. Behind a teal armchair cushion, the adorable little koala with green scarf is peeking out playfully.",
    p4: "Heartwarming embrace shot. Aiden and Luca sit cuddled between giant fluffy pillows, holding the koala plush between them safely."
  },
  21: {
    theme: "Town Street Shopping & Exploring Stores",
    p1: "Sunny outdoor street shot. Aiden and Luca walk along a charming town sidewalk lined with quaint storefronts with striped awnings.",
    p2: "Storefront showcase shot. They stroll past a brick town library and a bakery with warm bread in the display window, holding a green tote bag.",
    p3: "Inside town market shot. Luca points up at a hanging chalkboard price sign above wooden crates of fresh local produce.",
    p4: "Shop counter checkout shot. The boys stand happily at the wooden checkout counter with a friendly shopkeeper, ready to head to the park."
  },
  22: {
    theme: "Riding the Green Bus & Wheels Rolling",
    p1: "Street bus stop shot. A friendly green public bus pulls up beside the curb, and Aiden steps onto the low boarding platform.",
    p2: "Bus ticket close-up shot. Luca holds out a rectangular paper bus ticket to the smiling driver, looking through the glass door at the big black wheels.",
    p3: "Sidewalk bike stand shot. Stepping off the bus, they admire a cool teal bicycle with a front basket and a shiny red kick-scooter.",
    p4: "Tote bag carry shot. Luca and Aiden walk down the market lane holding hands on their tote bag handle, enjoying their safe transit."
  },
  23: {
    theme: "Helping Neighbors: The Baker & The Farmer",
    p1: "Shop entrance greeting shot. A warm, smiling shop owner in a clean apron waves hello at the entrance door to greet the two boys.",
    p2: "Bakery oven scene. A friendly baker in a white toque pulls a tray of golden, crusty sourdough loaves from a rustic stone oven.",
    p3: "Farm stand produce shot. A jolly farmer in overalls displays a wooden crate of crisp, polished red apples, handing one to Luca.",
    p4: "Community gratitude shot. Both boys bow their heads slightly with hands together, smiling warmly at their neighbor in mutual respect."
  },
  24: {
    theme: "Checking Shopping List & Counting Coins",
    p1: "Shopping aisle shot. Aiden holds a neatly folded paper shopping list with cute pencil checkmarks, while Luca carries a wire shopping basket.",
    p2: "Produce inspection shot. Luca carefully examines a ripe yellow melon and shiny red apples in the produce bin, checking their freshness.",
    p3: "Coin counting close-up. Aiden opens a little blue coin purse, counting shiny gold dollar coins on his open palm with Luca watching closely.",
    p4: "Cash register handover shot. Luca hands the coins to the smiling cashier, receiving a paper receipt and their packed paper shopping bag."
  },
  25: {
    theme: "Healthy Food & Staying Strong",
    p1: "Vibrant fruit aisle shot. Aiden reaches up to select fresh citrus oranges, learning about vitamins and healthy snacks.",
    p2: "Wellness tea shelf shot. Luca examines a jar of organic golden honey and herbal chamomile tea on a tidy pharmacy/grocery shelf.",
    p3: "Juice bottle close-up. Aiden places a glass bottle of fresh orange juice into their shopping cart, admiring its bright sunny color.",
    p4: "Energetic walk shot. Leaving the market, Luca flexes his arm bicep and Aiden takes a brisk strong stride, feeling energized and healthy."
  },
  26: {
    theme: "Clocktower Square & Road Safety",
    p1: "Wide pedestrian sidewalk shot. Aiden stops at the edge of the street curb, holding Luca's hand and looking left and right carefully.",
    p2: "Crosswalk crossing shot. The pedestrian light turns bright green, and the boys walk safely across bold white zebra stripes on the road.",
    p3: "Crossing guard assistance shot. A friendly crossing supervisor holding a bright stop sign smiles as she guides the children across safely.",
    p4: "Square bench rest shot. Under the shadow of a grand leafy oak tree near the clocktower, Aiden rubs sunscreen lotion onto his nose and checks a town map."
  },
  27: {
    theme: "Town Square Sports & Soccer Match",
    p1: "Open square plaza shot. Aiden wears a red sports pinny and Luca wears blue as they set down small orange cones on cobblestones for goalposts.",
    p2: "Dynamic soccer kick shot. Aiden kicks a black-and-white soccer ball powerfully toward the cone goal, with Luca diving playfully to block.",
    p3: "Running race action shot. Both boys sprint side-by-side across the wide open square, pumping their arms with spirited determination.",
    p4: "High-five sportsmanship shot. Catching their breath after the game, Aiden and Luca slap a high-five, celebrating great team play."
  },
  28: {
    theme: "Clocktower Bell Music & Drum Rhythm",
    p1: "Tower low-angle perspective. Aiden tilts his head way back, looking up at the majestic historic clocktower as bronze bells chime.",
    p2: "Clapping rhythm shot. Luca claps his hands in mid-air and taps his foot on the plaza stones, dancing to the melodic rhythm of the chimes.",
    p3: "Street musician interaction. A friendly street busker taps a gentle beat on a hand drum, and both boys hop and spin to the rhythm.",
    p4: "Artistic square drawing. Sitting on the plaza steps, Aiden paints the clocktower on watercolor paper while Luca adds yellow sunshine."
  },
  29: {
    theme: "Town Clock Hands & Changing Time of Day",
    p1: "Clock face close-up shot. The large circular Roman numeral clock on the tower face shows its two black ornate hands at 3 o'clock.",
    p2: "Afternoon plaza shot. Golden afternoon sunlight casts long diagonal shadows of the boys across the stone paving as they check a schedule.",
    p3: "Adventure map planning. Luca marks a star on their paper town map showing tomorrow's destination while Aiden nods eagerly.",
    p4: "Sunset transition shot. The sky behind the clocktower glows with lavender and peach sunset tones, as warm street lanterns flicker on."
  },
  30: {
    theme: "Weather Map & Weekly Forecast",
    p1: "Sunny blue sky shot. Aiden shields his eyes looking up at a radiant yellow sun in a crystal blue sky on a warm Monday morning.",
    p2: "Rain shelter flashback/diagram. Luca rolls up a compact blue umbrella next to a cafe awning, recalling Friday's rainstorm.",
    p3: "Windy breeze action shot. A sudden gust of wind blows through the plaza, and Luca catches his flying cap just in time, laughing aloud.",
    p4: "Weekend adventure map shot. Aiden and Luca point excitedly at a picnic trail marker on their weekend map, thrilled for Sunday."
  },
  31: {
    theme: "Four Seasons in the Botanical Flower Garden",
    p1: "Spring blossom entrance shot. Aiden and Luca enter an arched garden trellis draped with blooming pink wisteria and fresh spring raindrops.",
    p2: "Summer & autumn transition garden. Luca strolls along a garden path bordered by summer sunflowers and rustling bronze maple leaves.",
    p3: "Winter rainbow sky shot. Luca points high into the sky where a glorious vibrant rainbow arcs over frosted green garden hedges.",
    p4: "Lush botanical panoramic shot. Both boys smile broadly among beds of vibrant multi-colored tulips, celebrating garden beauty."
  },
  32: {
    theme: "Sprouting Seeds to Mighty Garden Tree",
    p1: "Potting bench shot. Aiden uses a miniature trowel to tuck a tiny brown seed into rich dark potting soil in a terracotta pot.",
    p2: "Sprout observation close-up. Luca leans in close to observe a tender pale green seedling sprout breaking through the moist earth.",
    p3: "Tree canopy low-angle shot. Looking up through the lush green leaves and blooming pink blossoms of a sturdy young fruit tree branch.",
    p4: "Garden pride shot. Aiden and Luca stand proudly beside a flourishing garden bed filled with tall sunflowers and lush green shrubs."
  },
  33: {
    theme: "Australian Bush Animals: Kangaroo & Tree Koala",
    p1: "Bushland meadow shot. In a sun-dappled eucalyptus grove, a friendly mother kangaroo with a joey in her pouch hops gently past the boys.",
    p2: "Eucalyptus tree canopy shot. Luca looks up into the fork of a tall gum tree where a sleepy wild koala hugs a thick branch securely.",
    p3: "Undergrowth tracking shot. Aiden parts tall green ferns to spot a plump, waddling wombat and a nimble little wallaby by a log.",
    p4: "Birdwatching close-up. On a low branch above, a wild kookaburra tilts its head with an open beak, calling out as the boys giggle."
  },
  34: {
    theme: "Gentle Domestic Friends: Birds, Bees & Duck Pond",
    p1: "Garden lawn scene. A playful golden retriever puppy chases a fluttering feather alongside a calm fluffy grey cat on the grass.",
    p2: "Bird feeder interaction shot. Luca gently extends an open palm filled with birdseed as a tiny colorful finch perches on his fingertips.",
    p3: "Macro nature close-up. Aiden inspects lavender flowers where fuzzy honeybees collect golden pollen while tiny ants march along a stone.",
    p4: "Pond water edge shot. Three yellow ducklings swim in a serene garden pond among water lilies, as Aiden and Luca wave from the wooden bridge."
  },
  35: {
    theme: "Ocean Coast Wonders: Whales, Turtles & Shells",
    p1: "Ocean overlook cliff shot. Aiden and Luca gaze over a sparkling sapphire sea where a majestic humpback whale breaches in the distance.",
    p2: "Sandy beach shoreline shot. Luca kneels on the soft white sand watching a sea turtle glide toward the surf and a tiny red crab scuttle.",
    p3: "Tide pool observation. Aiden points into a clear rocky tide pool where a curious purple octopus waves gentle tentacles under water.",
    p4: "Shell treasure close-up. Aiden holds a spiral pearlescent seashell to Luca's ear so he can listen to the roar of the ocean waves, smiling."
  },
  36: {
    theme: "Hiking Along the River to Forest Campsite",
    p1: "Riverbank trail shot. Aiden and Luca hike along a smooth pebble riverbank with sturdy backpacks, beside crystal clear mountain stream waters.",
    p2: "Mountain trail ascent. Looking up a winding green trail toward a rocky ridge as the boys hike upward with walking sticks.",
    p3: "Campsite setup scene. In a clearing surrounded by tall pine trees, Aiden pegs down a forest-green camping tent while Luca stacks kindling.",
    p4: "Campfire circle panoramic shot. Twilight descends on the forest camp as the boys sit on logs around an organized stone campfire ring."
  },
  37: {
    theme: "Little Scientists: Senses, Fire Sparks & Night Air",
    p1: "Warm glowing campfire shot. Aiden watches glowing golden embers and dancing orange flames of the campfire, mesmerized by the warmth.",
    p2: "Sensory nature shot. Luca closes his eyes and takes a deep breath of the crisp mountain air infused with aromatic pine needles.",
    p3: "Shadow play shot. Firelight projects long playful dancing shadows of Aiden, Luca, and their koala onto the canvas tent wall.",
    p4: "Stargazing night shot. Both boys look up at the midnight blue sky, pointing enthusiastically as a bright shooting star streaks past."
  },
  38: {
    theme: "Textures of Nature: Rough Wood, Hard Kettle & Pebbles",
    p1: "Firewood handling close-up. Aiden adds a rough, dry piece of eucalyptus firewood into the crackling campfire base with protective tongs.",
    p2: "Camp kettle scene. Luca touches the insulated handle of a durable metal campfire kettle steaming gently on an iron campfire grate.",
    p3: "Camp blanket comfort. Aiden wraps a thick red-and-grey fleece wool blanket around his shoulders, resting safely on a wooden camp stool.",
    p4: "Stone border arrangement. Luca places smooth grey river stones in a neat protective circle around the campfire coals for safety."
  },
  39: {
    theme: "Silent Cosmos: Silver Moon, Constellations & Campfire",
    p1: "Moonlit night canopy shot. A brilliant crescent silver moon hangs among thousands of glittering stars above the dark pine silhouettes.",
    p2: "Constellation tracing shot. Luca raises his finger to trace the shape of the Southern Cross constellation in the deep starry cosmos.",
    p3: "Night shadow portrait. Aiden moves his hands in front of the lantern glow, casting funny rabbit shadow puppets onto the tent fabric.",
    p4: "Warm tent porch view. Wrapping in blankets side by side at the tent entrance, the boys watch the warm campfire glow under the infinite cosmos."
  },
  40: {
    theme: "Eco Campers: Leaving No Trace & Forest Protection",
    p1: "Camp cleanup action shot. Aiden bends down with cotton gloves, picking up stray paper scraps and placing them into a designated rubbish bin.",
    p2: "Recycling station shot. Luca separates clear glass bottles and cardboard boxes into labeled color-coded recycling bags at the trailhead.",
    p3: "Safe fire extinguishing shot. Aiden pours water carefully from a pail onto the smoking embers, then Luca covers them with damp dirt to ensure safety.",
    p4: "Pristine campsite departure. Both boys stand with packed gear looking back at the perfectly spotless, lush green forest clearing with proud smiles."
  },
  41: {
    theme: "Star Observatory: The Great Telescope",
    p1: "Observatory dome interior shot. Aiden stands on a sturdy metal step stool, peering excitedly through the brass eyepiece of a massive telescope.",
    p2: "Turn-taking gesture shot. Aiden steps back with a welcoming smile, holding the telescope railing and inviting Luca to take his turn.",
    p3: "Telescope view simulation / reaction. Luca's eye widens in pure wonder as he sees craters on the silver moon through the optics.",
    p4: "Open dome starry terrace. Both boys lean on the observatory balcony railing under an ocean of stars, sharing their wildest adventure dreams."
  },
  42: {
    theme: "Comparing Stars: Blue Giants & Red Supergiants",
    p1: "Star chart consultation shot. Aiden and Luca spread a large navy-blue celestial star map on a lit viewing table under dim red dome lights.",
    p2: "Dual-star observation. Through the telescope lens, one star glows brilliant sapphire blue while an adjacent star pulses deep ruby red.",
    p3: "Scientific comparison discussion. Luca points to star spectrum color swatches in an astronomy notebook, discussing temperature differences with Aiden.",
    p4: "Observatory glowing portrait. Illuminated by gentle amber observation lamps, both boys smile broadly, captivated by stellar diversity."
  },
  43: {
    theme: "Big Universe Questions: North Star & The Milky Way",
    p1: "Astronomy encyclopedia lookup. Aiden flips through a thick hardbound astronomy book featuring illustrations of the North Star and navigational compass.",
    p2: "Milky way panoramic shot. The arch of the glittering Milky Way river stretches across the pitch-black sky, mirrored in Luca's awe-struck eyes.",
    p3: "Inquisitive night portrait. Luca tilts his head resting his chin on his knuckles, pondering why distant stars twinkle through Earth's atmosphere.",
    p4: "Cosmic discovery bond. The boys nod enthusiastically to each other, sketching planets and orbital paths in their shared field journal."
  },
  44: {
    theme: "Connecting Stars: Pegasus Constellation & Star Stories",
    p1: "Sky pointing shot. Aiden points up toward three bright stars aligned in an exact straight line high in the midnight sky.",
    p2: "Constellation line drawing shot. On their glow-in-the-dark starchart, Luca uses a white marker to connect the stars into the shape of a winged Pegasus horse.",
    p3: "Storytelling gesture shot. Luca waves his hands theatrically, narrating the glowing starry tail of the magical horse as Aiden laughs and listens.",
    p4: "Completed star chart showcase. Aiden and Luca hold up their finished illuminated constellation map together, beaming with artistic pride."
  },
  45: {
    theme: "Publishing the Star Book: The Brave Koala Hero",
    p1: "Creative writing scene. Aiden writes carefully with an ink pen in a leatherbound journal, titling their new storybook about the brave scarf koala.",
    p2: "Observatory window setting shot. Luca sketches the starry mountain ridge and observatory dome as the picturesque story setting.",
    p3: "Plot twist discussion shot. Luca mimics an animated koala problem-solving pose, bringing laughter and clever ideas to the storyline.",
    p4: "Book completion celebration. The boys close the colorful storybook cover adorned with a hand-drawn gold star, smiling at their finished tale."
  },
  46: {
    theme: "50-Day Quest: The Time Capsule Treasure Map",
    p1: "Expedition map rollout. Aiden and Luca unroll a parchment treasure map across a flat rock, holding a sturdy metal time capsule box.",
    p2: "Trail navigation shot. Luca holds a brass compass and points along a secret trail winding through ancient eucalyptus trees.",
    p3: "Hiking up the ridge. Both boys hike up a scenic hillside with walking sticks, encouraging each other like legendary explorers.",
    p4: "Arrival at the secret spot. Under the canopy of a majestic old gum tree with panoramic views, they set down the capsule box at the chosen spot."
  },
  47: {
    theme: "Working Together: Digging & Burying the Capsule",
    p1: "Teamwork carry shot. Aiden and Luca lift the heavy metal keepsake capsule together, one boy holding each side handle steadily.",
    p2: "Digging action shot. Luca uses a camping spade to dig a neat deep hole in the fertile soil, shoveling dirt aside with steady effort.",
    p3: "Placing capsule inside. Aiden gently lowers the sealed memory box into the excavation pit, surrounded by dry leaves and smooth stones.",
    p4: "Covering and landmarking. Both boys pack soft soil over the spot and place a distinctive white quartz stone as a secret future marker."
  },
  48: {
    theme: "Treasured Keepsakes: 50 Days of Friendship",
    p1: "Keepsake review shot. Aiden shows Luca a colorful drawing of their very first day in classroom, recalling fond early memories.",
    p2: "Vocabulary flashcard review. Luca flips through a stack of well-loved English vocabulary cards, laughing at how easy English has become.",
    p3: "Capsule inspection before sealing. The open capsule reveals photos, notes, badges, and drawings packed with immense sentimental love.",
    p4: "Gentle hilltop breeze portrait. Sitting on the grassy knoll with wind tousling their hair, the two boys look out over the valley in serene gratitude."
  },
  49: {
    theme: "Reflecting on Growth: Learning from Mistakes",
    p1: "Journey review on parchment. Aiden traces the winding 50-step path on their expedition map, reminiscing on how much they learned.",
    p2: "Encouraging shoulder pat. When recalling a challenging day, Luca pats Aiden's shoulder with a warm smile: 'Mistakes helped us grow!'",
    p3: "Joyful realization portrait. Aiden's face lights up with wisdom and confidence, nodding happily at all the good ideas they shared.",
    p4: "Handclasp of solidarity. The two boys grip hands in a firm, loyal handshake, realizing true friendship and mutual understanding."
  },
  50: {
    theme: "Grand Finale: 50-Day Graduation & Explorer's Oath",
    p1: "Triumphant map display. Aiden and Luca hold up their completed 50-Day Expedition Certificate with a big bold golden stamp of achievement.",
    p2: "Pinning the explorer badge. Luca gently pins a shiny golden star 'Junior Explorer' badge onto Aiden's blue shirt, celebrating full completion.",
    p3: "Pinky promise oath. Both boys link pinky fingers in an earnest, heartfelt promise to stay best friends and lifelong adventurers.",
    p4: "Grand finale celebration. Both boys jump high into the air with arms raised in victory, wide joyful grins, the koala cheering beside them!"
  }
};

const refinedPromptsArray = [];

for (let d = 1; d <= 50; d++) {
  const ep = Math.floor((d - 1) / 5);
  const dayData = comics[ep].daily[d];
  const panels = dayData.panels;
  const dir = visualDirections[d];

  const prompt = `Create ONE entirely NEW square children's English educational comic page, exactly FOUR equal panels in a precise 2x2 grid. Thin cream centre gutters. Warm polished storybook gouache illustration style. Character identity: Aiden (Korean boy age 7, short neat black hair, blue T-shirt, navy shorts), Luca (Korean boy age 6, short neat black hair, yellow T-shirt, khaki shorts), both are young boys, and a friendly tiny koala wearing a green scarf. All four panels must independently show the specific action, distinctive camera perspective, and key objects described; English dialogue is for narrative meaning ONLY and MUST NOT be printed anywhere in the image. ABSOLUTELY NO text, NO letters, NO numbers, NO speech bubbles, NO captions, NO signs with words, NO logos, NO watermarks. Reading order top-left, top-right, bottom-left, bottom-right.
DAY ${d}: ${dayData.title}. Theme: ${dir.theme}. Story: ${dayData.story}
PANEL 1 (top-left): ${dir.p1} Dialogue meaning: "${panels[0].en}" (Visual hint: ${panels[0].alt})
PANEL 2 (top-right): ${dir.p2} Dialogue meaning: "${panels[1].en}" (Visual hint: ${panels[1].alt})
PANEL 3 (bottom-left): ${dir.p3} Dialogue meaning: "${panels[2].en}" (Visual hint: ${panels[2].alt})
PANEL 4 (bottom-right): ${dir.p4} Dialogue meaning: "${panels[3].en}" (Visual hint: ${panels[3].alt})`;

  refinedPromptsArray.push({
    day: d,
    title: dayData.title,
    theme: dir.theme,
    prompt: prompt
  });
}

const scratchFile = path.join(root, 'scratch', 'prompts_refined_50.json');
fs.writeFileSync(scratchFile, JSON.stringify(refinedPromptsArray, null, 2), 'utf8');
console.log('Saved scratch/prompts_refined_50.json with 50 differentiated prompts!');
