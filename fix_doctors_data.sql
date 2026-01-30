-- 1. Clear the incorrect data
DELETE FROM `doctors`;

-- 2. Insert data with valid JSON for expertise and available_days
INSERT INTO `doctors` (`hospital_id`, `specialty_id`, `name`, `slug`, `specialization`, `experience`, `patients_treated`, `rating`, `reviews`, `image`, `qualifications`, `expertise`, `bio`, `consultation_fee`, `available_days`) 
VALUES 
(1, 1, 'Dr. Rajesh Sharma', 'dr-rajesh-sharma', 'Pediatric Cardiologist', '22', '12000', 4.8, '450', 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=2070', 'MBBS, MD, DM (Cardiology)', '["Pediatric Cardiac Surgery", "Congenital Heart Defects"]', 'Dr. Rajesh Sharma is a leading Pediatric Cardiologist with over two decades of experience.', 2500.00, '["Mon", "Wed", "Fri"]'),

(2, 2, 'Dr. Vinod Raina', 'dr-vinod-raina', 'Medical Oncologist', '30', '20000', 4.9, '800', 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=2070', 'MBBS, MD (Medicine), DM (Medical Oncology)', '["Chemotherapy", "Immunotherapy", "Breast Cancer"]', 'Dr. Vinod Raina is one of India’s foremost Medical Oncologists.', 3000.00, '["Tue", "Thu", "Sat"]'),

(3, 3, 'Dr. Pradeep Sharma', 'dr-pradeep-sharma', 'Spine Surgeon', '18', '8000', 4.7, '300', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=2128', 'MBBS, MS (Ortho), Fellowship in Spine Surgery', '["Minimally Invasive Spine Surgery", "Scoliosis Correction"]', 'Dr. Pradeep Sharma specializes in complex spine surgeries.', 2000.00, '["Mon", "Tue", "Thu"]'),

(4, 4, 'Dr. Sumit Singh', 'dr-sumit-singh', 'Neurologist', '20', '10000', 4.8, '550', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=2070', 'MBBS, MD, DM (Neurology)', '["Stroke Management", "Headache Medicine", "Parkinson’s Disease"]', 'Dr. Sumit Singh is a renowned Neurologist known for his expertise in headache medicine.', 2200.00, '["Wed", "Fri", "Sat"]'),

(5, 5, 'Dr. Randhir Sud', 'dr-randhir-sud', 'Gastroenterologist', '35', '25000', 4.9, '900', 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=2070', 'MBBS, MD, DM (Gastroenterology)', '["Endoscopy", "ERCP", "Liver Diseases"]', 'Dr. Randhir Sud is a pioneer in the field of Gastroenterology in India.', 3500.00, '["Mon", "Wed", "Thu"]'),

(1, 6, 'Dr. Dharma Choudhary', 'dr-dharma-choudhary', 'Hematologist', '15', '5000', 4.6, '200', 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=2070', 'MBBS, MD, DM (Clinical Hematology)', '["Bone Marrow Transplant", "Leukemia", "Thalassemia"]', 'Dr. Dharma Choudhary is a dedicated Hematologist specializing in BMT.', 2800.00, '["Tue", "Fri"]'),

(2, 1, 'Dr. Balbir Singh', 'dr-balbir-singh', 'Interventional Cardiologist', '25', '18000', 4.8, '600', 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=2070', 'MBBS, MD, DM (Cardiology)', '["Angioplasty", "Pacemaker Implantation"]', 'Dr. Balbir Singh is a highly respected Interventional Cardiologist.', 2600.00, '["Mon", "Thu", "Sat"]'),

(3, 2, 'Dr. Meenu Walia', 'dr-meenu-walia', 'Medical Oncologist', '22', '11000', 4.7, '400', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=2070', 'MBBS, MD, DNB (Medical Oncology)', '["Solid Tumors", "Targeted Therapy"]', 'Dr. Meenu Walia is the first DNB Medical Oncologist of India.', 2400.00, '["Wed", "Fri"]'),

(4, 3, 'Dr. IPS Oberoi', 'dr-ips-oberoi', 'Joint Replacement Surgeon', '28', '14000', 4.9, '750', 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=2128', 'MBBS, MS (Ortho), MCh (Ortho)', '["Knee Replacement", "Hip Replacement", "Arthroscopy"]', 'Dr. IPS Oberoi is a leading expert in joint replacement and arthroscopic surgeries.', 3200.00, '["Tue", "Thu", "Sat"]'),

(5, 4, 'Dr. Rana Patir', 'dr-rana-patir', 'Neurosurgeon', '30', '16000', 4.8, '650', 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=2070', 'MBBS, MS, MCh (Neurosurgery)', '["Brain Tumor", "Skull Base Surgery", "Epilepsy Surgery"]', 'Dr. Rana Patir is one of the most experienced Neurosurgeons in the country.', 3800.00, '["Mon", "Wed", "Fri"]');
