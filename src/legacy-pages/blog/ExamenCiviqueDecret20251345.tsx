import { Link } from "react-router-dom";
import { UnifiedLayout } from "@/components/layout/UnifiedLayout";
import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, AlertTriangle, BookOpen, FileText, Target, Clock, Users, TrendingUp } from "lucide-react";
import { TextToSpeech } from "@/components/TextToSpeech";

const ExamenCiviqueDecret20251345 = () => {
	const longformContent = `Examen Civique 2026 : Réussir le QCM Obligatoire pour la Carte de Résident et la Naturalisation. Le décret n° 2025-1345 publiés au Journal Officiel le 28 décembre 2025 révolutionne l'accès aux titres de séjour pluriannuels. Découvrez tout ce qu'il faut savoir sur ce nouvel examen civique obligatoire dès le 1er janvier 2026. Questions examen civique, seuil 80%, 40 questions QCM, titre de séjour pluriannuel, OQTF, naturalisation.`;

	return (
		<UnifiedLayout>
			<SEO
				title="Examen Civique 2026 : Réussir le QCM Obligatoire - Décret n° 2025-1345"
				description="Guide complet examen civique 2026 : format QCM 40 questions, seuil 80%, décret 2025-1345, titre de séjour pluriannuel, naturalisation. Décrypte ce qui change au 1er janvier 2026."
				keywords="examen civique 2026, décret 2025-1345, questions examen civique, QCM civique, titre de séjour pluriannuel, naturalisation France, OQTF, questions naturalisation"
				canonical="/blog/examen-civique-decret-2025-1345"
				image="https://qcmcivique.fr/og-examen-civique-2026.jpg"
			/>

			<article className="container mx-auto px-4 py-8 max-w-4xl">
				<Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
					<ArrowLeft className="w-4 h-4" />
					Retour au blog
				</Link>

				<header className="mb-8">
					<div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
						<div className="flex items-center gap-2">
							<span className="px-3 py-1 bg-red-500/10 text-red-600 dark:text-red-400 rounded-full text-sm font-semibold">⚠️ Urgent - 2026</span>
							<span className="text-muted-foreground text-sm flex items-center gap-1">
                <Clock className="w-4 h-4" /> 18 min de lecture
              </span>
						</div>
						<TextToSpeech
							text={longformContent}
							variant="outline"
							size="sm"
							showLabel
						/>
					</div>
					<h1 className="text-3xl md:text-4xl font-bold mb-4">
						Examen Civique 2026 : Le Couperet tombe ce 1er janvier. Tout ce qui change (Décret n° 2025-1345)
					</h1>
					<p className="text-lg text-muted-foreground mb-4">
						Les textes publiés au Journal Officiel du 26-28 décembre 2025 confirment l'entrée en vigueur immédiate du nouvel examen civique obligatoire. Dès ce jeudi, l'accès au titre de séjour pluriannuel et à la naturalisation ne dépendra plus de votre présence aux formations, mais de votre réussite. Voici l'analyse complète du nouveau mur administratif français.
					</p>
					<div className="flex items-center gap-2 text-sm text-muted-foreground pb-4 border-b">
						<span>📅 Mis à jour : 30 décembre 2025</span>
						<span>•</span>
						<span>✍️ Auteur : Équipe QCM Civique</span>
					</div>
				</header>

				<section className="prose prose-lg max-w-none">

					{/* SECTION 1 : LA CONFIRMATION DE DERNIÈRE MINUTE */}
					<Card className="p-6 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 mb-8">
						<div className="flex items-start gap-3">
							<AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 mt-1 flex-shrink-0" />
							<div>
								<h3 className="font-bold text-lg mb-2 text-red-700 dark:text-red-400">🔴 Changement de paradigme confirmé : Fin de la "tolérance administrative"</h3>
								<p className="text-muted-foreground mb-3">
									Les rumeurs de report sont officiellement closes. Le <strong>Décret n° 2025-1345</strong> publié au Journal Officiel le 28 décembre 2025, suivi de plusieurs arrêtés ministériels (22 décembre, publiés le 26/12), valide définitivement l'application de la Loi Immigration. L'État a verrouillé le dispositif pendant la trêve des confiseurs.
								</p>
								<p className="text-muted-foreground font-semibold">
									Résultat : Dès <strong>jeudi 1er janvier 2026</strong>, l'examen civique obligatoire est actif dans tous les centres agréés de France.
								</p>
							</div>
						</div>
					</Card>

					<p className="lead text-lg font-semibold mb-6">
						Jusqu'en 2025, la formation civique du Contrat d'Intégration Républicaine (CIR) était validée par simple présence. Dès 2026, l'État impose une <strong>obligation de résultat</strong>. L'article L. 413-7 du CESEDA (Code de l'entrée et du séjour des étrangers et du droit d'asile) conditionne désormais la délivrance des titres à la réussite de cet examen éliminatoire.
					</p>

					{/* SECTION 2 : LE CHANGEMENT JURIDIQUE */}
					<h2 className="text-2xl font-bold mt-8 mb-4">1. La Nouvelle Mécanique Administrative : "Plus dur que le Code de la Route"</h2>

					<p>
						C'est l'inversion complète du système. Jusqu'à présent, il suffisait de cocher une case "présence attestée" lors des journées de formation civique. Désormais, vous serez face à une tablette ou une feuille, seul, dans un centre d'examen agréé. Pas d'échappatoire. Pas de "deuxième chance" avant plusieurs mois.
					</p>

					<div className="grid md:grid-cols-3 gap-4 my-8">
						<Card className="p-4 border-2">
							<h4 className="font-bold mb-3 text-lg">Avant (2025)</h4>
							<ul className="space-y-2 text-sm">
								<li className="flex items-start gap-2">
									<span className="text-gray-400">✗</span>
									<span>Simple attestation d'assiduité</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-gray-400">✗</span>
									<span>Présence physique suffisante</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-gray-400">✗</span>
									<span>Faible taux d'élimination</span>
								</li>
							</ul>
						</Card>
						<Card className="p-4 border-2 bg-primary/5 border-primary">
							<h4 className="font-bold mb-3 text-lg">Après (2026+)</h4>
							<ul className="space-y-2 text-sm">
								<li className="flex items-start gap-2">
									<span className="text-green-600">✓</span>
									<span><strong>Examen QCM obligatoire</strong></span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-green-600">✓</span>
									<span><strong>40 questions</strong>, seuil 80%</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="text-green-600">✓</span>
									<span><strong>Filtrage massif</strong> prévu</span>
								</li>
							</ul>
						</Card>
						<Card className="p-4 border-2 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
							<h4 className="font-bold mb-3 text-lg">Impact</h4>
							<p className="text-sm font-semibold text-yellow-700 dark:text-yellow-400 mb-2">Risque OQTF accru</p>
							<p className="text-sm">L'échec massif envisagé pourrait motiver des Obligations de Quitter le Territoire dans certains dossiers délicats.</p>
						</Card>
					</div>

					<Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 my-6">
						<h3 className="font-bold text-lg mb-2">📊 Comparaison : "Pourquoi c'est plus dur que vous ne le pensez"</h3>
						<div className="space-y-3 text-sm">
							<div className="flex justify-between items-center p-2 bg-white dark:bg-black/20 rounded">
								<span><strong>Code de la Route</strong></span>
								<span className="text-yellow-600 font-bold">87% requis (35/40)</span>
							</div>
							<div className="flex justify-between items-center p-2 bg-white dark:bg-black/20 rounded">
								<span><strong>Examen Civique 2026</strong></span>
								<span className="text-red-600 font-bold">80% requis (32/40)</span>
							</div>
							<p className="text-muted-foreground mt-3">
								À première vue, l'examen civique paraît plus facile (7 points de marge vs 5). Or, les sujets civiques font appel à des références culturelles très pointues que même beaucoup de Français de naissance ignorent. Les associations signalent cette semaine que le taux d'échec prévu dépasse 25% dès janvier.
							</p>
						</div>
					</Card>

					{/* SECTION 3 : STRUCTURE DE L'EXAMEN */}
					<h2 className="text-2xl font-bold mt-8 mb-4">2. Structure de l'Épreuve : 40 Questions pour Convaincre la République</h2>

					<p className="mb-4">
						L'examen n'est pas un simple quiz d'histoire. C'est un dispositif hybride et conçu pour piéger ceux qui n'ont pas intégré les "codes" culturels et civiques français.
					</p>

					<div className="grid md:grid-cols-2 gap-4 my-6">
						<Card className="p-6 border-l-4 border-l-blue-500">
							<h4 className="font-bold mb-3 flex items-center gap-2">
								<BookOpen className="w-5 h-5 text-blue-500" />
								28 Questions de Connaissance (Savoirs)
							</h4>
							<p className="text-sm text-muted-foreground mb-4">
								Faits objectifs sur l'Histoire, la Géographie et les Institutions. Ces questions testent la mémorisation de dates clés et de faits vérifiables.
							</p>
							<div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded text-sm">
								<strong>Exemples :</strong>
								<ul className="mt-2 space-y-1">
									<li>• "En quelle année a été abolie la peine de mort en France ?"</li>
									<li>• "Qui réside au Palais du Luxembourg ?"</li>
									<li>• "Quel est le principal fleuve de France ?"</li>
									<li>• "En quelle année la loi séparant l'Église et l'État a-t-elle été votée ?"</li>
								</ul>
							</div>
						</Card>
						<Card className="p-6 border-l-4 border-l-primary">
							<h4 className="font-bold mb-3 flex items-center gap-2">
								<Target className="w-5 h-5 text-primary" />
								12 Mises en Situation (Réflexes Civiques)
							</h4>
							<p className="text-sm text-muted-foreground mb-4">
								Évaluation de l'appropriation des valeurs républicaines (laïcité, égalité femmes-hommes). C'est la "partie piège" de l'examen.
							</p>
							<div className="bg-primary/5 p-3 rounded text-sm">
								<strong>Principe :</strong>
								<p className="mt-2">On vous présente un scénario de la vie quotidienne (travail, école, espace public) et vous devez choisir la réaction conforme aux valeurs de la République française.</p>
							</div>
						</Card>
					</div>

					<Card className="p-6 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 my-6">
						<h3 className="font-bold text-lg mb-3 text-red-700 dark:text-red-400">🚨 Seuil Éliminatoire : 80% de Réussite</h3>
						<p className="text-muted-foreground mb-4">
							L'article D. 413-12-2 du CESEDA, fixé par le décret n° 2025-1345, impose un score très élevé : <strong>32 bonnes réponses sur 40 exigées minimum</strong>. Cela ne laisse qu'une marge d'erreur de 8 questions.
						</p>
						<div className="grid md:grid-cols-2 gap-4">
							<div className="p-3 bg-white dark:bg-black/20 rounded">
								<p className="text-sm"><strong>Score acceptable :</strong></p>
								<p className="text-2xl font-bold text-green-600">32/40 (80%)</p>
							</div>
							<div className="p-3 bg-white dark:bg-black/20 rounded">
								<p className="text-sm"><strong>Vous échouez si :</strong></p>
								<p className="text-2xl font-bold text-red-600">≤31/40 (77,5%)</p>
							</div>
						</div>
						<p className="text-sm mt-4 p-3 bg-red-100 dark:bg-red-900/40 rounded-lg">
							⚠️ <strong>Conséquence immédiate :</strong> Refus de titre pluriannuel. Vous restez bloqué sur des titres annuels, obligeant à refaire toutes les démarches OFII l'année suivante.
						</p>
					</Card>

					{/* SECTION 4 : LES 5 PILIERS THÉMATIQUES */}
					<h2 className="text-2xl font-bold mt-8 mb-4">3. Les 5 Piliers Thématiques du Programme Officiel</h2>

					<p className="mb-6">
						Le programme s'organise autour de 5 axes définis par l'arrêté du 10 octobre 2025 (publié au JO). Chacun porte une pondération différente dans l'examen :
					</p>

					<div className="overflow-x-auto my-6">
						<table className="w-full border-collapse text-sm">
							<thead>
								<tr className="bg-muted">
									<th className="border border-border p-3 text-left font-bold">Thématique</th>
									<th className="border border-border p-3 text-left font-bold">Contenus Clés</th>
									<th className="border border-border p-3 text-left font-bold">Poids</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className="border border-border p-3 font-semibold">🇫🇷 Principes et Valeurs</td>
									<td className="border border-border p-3">Laïcité (Loi de 1905), Liberté-Égalité-Fraternité, Refus des discriminations, Égalité femmes-hommes</td>
									<td className="border border-border p-3"><span className="px-2 py-1 bg-red-500/20 text-red-700 dark:text-red-400 rounded text-xs font-bold">🔴 Critique</span></td>
								</tr>
								<tr className="bg-muted/50">
									<td className="border border-border p-3 font-semibold">🏛️ Institutions</td>
									<td className="border border-border p-3">Rôle du Président, Gouvernement, Assemblée Nationale, Sénat, Communes, Départements, Régions, UE</td>
									<td className="border border-border p-3"><span className="px-2 py-1 bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 rounded text-xs font-bold">🟡 Moyenne</span></td>
								</tr>
								<tr>
									<td className="border border-border p-3 font-semibold">📚 Histoire & Géographie</td>
									<td className="border border-border p-3">1789, 1848 (fin esclavagisme), 1905, 1944 (droit de vote), 1958, Fleuves, DROM-COM, Voisins</td>
									<td className="border border-border p-3"><span className="px-2 py-1 bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 rounded text-xs font-bold">🟡 Moyenne</span></td>
								</tr>
								<tr className="bg-muted/50">
									<td className="border border-border p-3 font-semibold">⚖️ Droits et Devoirs</td>
									<td className="border border-border p-3">Droit de vote, Impôts, Obligations légales, Instruction obligatoire, Protection sociale, Travail</td>
									<td className="border border-border p-3"><span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs font-bold">🔵 Haute</span></td>
								</tr>
								<tr>
									<td className="border border-border p-3 font-semibold">👥 Vivre en Société</td>
									<td className="border border-border p-3">Accès aux soins, Logement, Emploi, Savoir-vivre français, Refus du harcèlement, Respect d'autrui</td>
									<td className="border border-border p-3"><span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs font-bold">🔵 Haute</span></td>
								</tr>
							</tbody>
						</table>
					</div>

					<Card className="p-6 bg-primary/5 my-6">
						<h3 className="font-bold mb-3">💡 Tendance Observée cette Semaine</h3>
						<p className="text-muted-foreground">
							Les associations de formation signalent une inflation des questions sur la <strong>laïcité</strong> et l'<strong>égalité femmes-hommes</strong>. Ces deux thèmes, considérés comme "non-négociables" par l'administration, pourraient représenter jusqu'à 30% de l'examen en 2026.
						</p>
					</Card>

					{/* SECTION 5 : CONSÉQUENCES DU DÉCRET 2025-1345 */}
					<h2 className="text-2xl font-bold mt-8 mb-4">4. Conséquences du Décret n° 2025-1345 : Pourquoi c'est un séisme pour les étrangers</h2>

					<p className="mb-4">
						Ce décret modifie radicalement la stratégie d'intégration française. Jusqu'au 31 décembre 2025, l'échec administratif venait souvent d'un dossier incomplet ou de délais bureaucratiques. Dès 2026, l'échec viendra d'une <strong>note éliminatoire personnelle</strong>.
					</p>

					<div className="space-y-4 my-6">
						<Card className="p-4 border-l-4 border-l-red-500">
							<div className="flex items-start gap-3">
								<div className="text-2xl">1️⃣</div>
								<div>
									<h4 className="font-bold mb-1">Refus du Titre Pluriannuel</h4>
									<p className="text-sm text-muted-foreground">
										Score inférieur à 32/40 = refus automatique de passage d'un titre annuel à un titre pluriannuel (4 ans). Vous restez bloqué sur des renouvellements annuels, obligeant à refaire les démarches OFII chaque année.
									</p>
								</div>
							</div>
						</Card>

						<Card className="p-4 border-l-4 border-l-orange-500">
							<div className="flex items-start gap-3">
								<div className="text-2xl">2️⃣</div>
								<div>
									<h4 className="font-bold mb-1">Risque OQTF (Obligation de Quitter le Territoire Français)</h4>
									<p className="text-sm text-muted-foreground">
										Les textes récents des 26-28 décembre précisent que l'échec à démontrer son intégration républicaine peut, dans certains cas, motiver une OQTF. Cela s'ajoute à d'autres critères (situation professionnelle, logement), mais représente un changement de doctrine.
									</p>
								</div>
							</div>
						</Card>

						<Card className="p-4 border-l-4 border-l-yellow-500">
							<div className="flex items-start gap-3">
								<div className="text-2xl">3️⃣</div>
								<div>
									<h4 className="font-bold mb-1">Embouteillage Administratif Prévu</h4>
									<p className="text-sm text-muted-foreground">
										Avec l'afflux de demandes d'examen dès janvier 2026 et le nombre limité de places par centre, rater son test signifie attendre potentiellement 2 à 3 mois pour une nouvelle date, mettant en péril la régularité du séjour pour certains.
									</p>
								</div>
							</div>
						</Card>

						<Card className="p-4 border-l-4 border-l-purple-500">
							<div className="flex items-start gap-3">
								<div className="text-2xl">4️⃣</div>
								<div>
									<h4 className="font-bold mb-1">Impact sur la Naturalisation</h4>
									<p className="text-sm text-muted-foreground">
										Pour accéder à la naturalisation, le réussite à l'examen civique est devenue une étape préalable depuis le décret 2025-647 (juillet). L'article L. 111-4-2 du Code civil conditionne explicitement l'accès à la nationalité française.
									</p>
								</div>
							</div>
						</Card>
					</div>

					{/* SECTION 6 : PRÉPARER L'EXAMEN */}
					<h2 className="text-2xl font-bold mt-8 mb-4">5. Comment se Préparer Efficacement ? L'Improvisation est Interdite</h2>

					<p className="mb-4">
						Face à ce durcissement et au seuil de 80%, le "bon sens" ne suffit plus. Les candidats doivent adopter une approche scolaire, voire académique.
					</p>

					<Card className="p-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 my-6">
						<h3 className="font-bold mb-4 flex items-center gap-2">
							<CheckCircle className="w-5 h-5 text-green-600" />
							Stratégie de Révision Recommandée
						</h3>
						<div className="space-y-3">
							<div>
								<h4 className="font-semibold text-sm mb-1">Phase 1 : Dates Clés (1 semaine)</h4>
								<p className="text-sm text-muted-foreground">Mémoriser les grands jalons : 1789 (Révolution), 1848 (fin esclavagisme), 1905 (Loi Séparation Église-État), 1944 (droit de vote des femmes), 1958 (Vème République).</p>
							</div>
							<div>
								<h4 className="font-semibold text-sm mb-1">Phase 2 : Géographie (1 semaine)</h4>
								<p className="text-sm text-muted-foreground">Localiser les grands fleuves (Loire, Seine, Rhône, Garonne), massifs montagneux (Alpes, Pyrénées, Jura) et DROM-COM.</p>
							</div>
							<div>
								<h4 className="font-semibold text-sm mb-1">Phase 3 : Institutions (1 semaine)</h4>
								<p className="text-sm text-muted-foreground">Rôle du Président, Gouvernement, Assemblée, Sénat, collectivités territoriales, UE.</p>
							</div>
							<div>
								<h4 className="font-semibold text-sm mb-1">Phase 4 : Laïcité & Valeurs (2 semaines - CRITIQUE)</h4>
								<p className="text-sm text-muted-foreground">Comprendre (pas juste mémoriser) les principes de laïcité, égalité, liberté de conscience. Pratiquer les mises en situation.</p>
							</div>
							<div>
								<h4 className="font-semibold text-sm mb-1">Phase 5 : Entraînement QCM (2 semaines)</h4>
								<p className="text-sm text-muted-foreground">S'entraîner en conditions réelles : 40 questions, 45 minutes, sur des simulateurs fiables.</p>
							</div>
						</div>
					</Card>

					<Card className="p-6 my-6">
						<h3 className="font-bold mb-4 flex items-center gap-2">
							<FileText className="w-5 h-5 text-primary" />
							Ressources Officielles Recommandées
						</h3>
						<ul className="space-y-3">
							<li className="flex items-start gap-3">
								<span className="text-primary font-bold">1.</span>
								<div>
									<p className="font-semibold text-sm">Plateforme officielle OFII</p>
									<p className="text-xs text-muted-foreground">formation-civique.interieur.gouv.fr - Accès gratuit aux documents d'étude</p>
								</div>
							</li>
							<li className="flex items-start gap-3">
								<span className="text-primary font-bold">2.</span>
								<div>
									<p className="font-semibold text-sm">Livret du Citoyen (Version 2026)</p>
									<p className="text-xs text-muted-foreground">Téléchargeable gratuitement, mis à jour pour la réforme 2026</p>
								</div>
							</li>
							<li className="flex items-start gap-3">
								<span className="text-primary font-bold">3.</span>
								<div>
									<p className="font-semibold text-sm">Les 40 Questions Officielles</p>
									<p className="text-xs text-muted-foreground">Banque de questions confirmées par les arrêtés du 22 octobre 2025</p>
								</div>
							</li>
							<li className="flex items-start gap-3">
								<span className="text-primary font-bold">4.</span>
								<div>
									<p className="font-semibold text-sm">QCM Civique - Simulateur d'Entraînement</p>
									<p className="text-xs text-muted-foreground">Conditions réelles, corrections détaillées, progression suivie</p>
								</div>
							</li>
						</ul>
						<div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
							<p className="text-xs font-semibold text-yellow-700 dark:text-yellow-400">
								⚠️ <strong>Attention :</strong> Ne pas se fier aux quiz obsolètes d'avant 2024. La réforme décrets 2025-647 et 2025-1345 a introduit des questions spécifiques sur la "culture de la société française" qui n'existaient pas auparavant.
							</p>
						</div>
					</Card>

					{/* SECTION 7 : DISPENSES */}
					<h2 className="text-2xl font-bold mt-8 mb-4">6. Dispenses et Cas Particuliers (Qui n'est Pas Concerné ?)</h2>

					<div className="space-y-4 my-6">
						<div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
							<CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
							<div>
								<strong>Barrière d'Âge :</strong>
								<p className="text-sm text-muted-foreground mt-1">Les étrangers âgés de plus de 65 ans sont dispensés de cet examen pour la carte de résident (CR). Toutefois, cette dispense ne s'applique pas pour le titre pluriannuel (CSP).</p>
							</div>
						</div>
						<div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
							<CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
							<div>
								<strong>Santé et Handicap :</strong>
								<p className="text-sm text-muted-foreground mt-1">Dispense possible sur présentation d'un certificat médical conforme au modèle fixé par arrêté (déficience cognitive, invalidité 80%+, maladie grave).</p>
							</div>
						</div>
						<div className="flex items-start gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
							<AlertTriangle className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
							<div>
								<strong>Renouvellement :</strong>
								<p className="text-sm text-muted-foreground mt-1">L'examen n'est pas requis pour le simple renouvellement d'une carte de même nature. Toutefois, il l'est pour le changement de catégorie (ex : Visiteur → Travailleur).</p>
							</div>
						</div>
						<div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
							<CheckCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
							<div>
								<strong>Validité :</strong>
								<p className="text-sm text-muted-foreground mt-1">Une fois réussi, l'examen est valide pendant 4 ans. Vous n'avez pas besoin de le repasser pour renouveler votre titre dans cette période.</p>
							</div>
						</div>
					</div>

					{/* SECTION 8 : QUESTIONS FRÉQUENTES */}
					<h2 className="text-2xl font-bold mt-8 mb-4">7. Questions Fréquentes (FAQ) Basée sur les Signaux de cette Semaine</h2>

					<div className="space-y-4 my-6">
						<Card className="p-4">
							<h4 className="font-semibold mb-2">Q : L'examen est-il réellement obligatoire dès le 1er janvier 2026 ?</h4>
							<p className="text-sm text-muted-foreground">
								<strong>R :</strong> Oui. Les décrets n° 2025-1345 (28/12/2025) et arrêtés associés confirment cette date. Aucun report n'a été annoncé. Les préfectures ont reçu les directives le 27 décembre.
							</p>
						</Card>

						<Card className="p-4">
							<h4 className="font-semibold mb-2">Q : Quel est exactement le seuil de réussite ?</h4>
							<p className="text-sm text-muted-foreground">
								<strong>R :</strong> 32 bonnes réponses sur 40 (80%). C'est le minimum. En dessous de 32, vous échouez. Pas de demi-points ou arrondis.
							</p>
						</Card>

						<Card className="p-4">
							<h4 className="font-semibold mb-2">Q : Quelles sont les conséquences d'un échec ?</h4>
							<p className="text-sm text-muted-foreground">
								<strong>R :</strong> Refus de passage à titre pluriannuel, blocage sur renouvellements annuels, risque OQTF dans certains dossiers, et retard pour l'accès à la naturalisation.
							</p>
						</Card>

						<Card className="p-4">
							<h4 className="font-semibold mb-2">Q : Combien ça coûte ?</h4>
							<p className="text-sm text-muted-foreground">
								<strong>R :</strong> 69 € par passage. Dans certains cas (primo-signature CIR), l'État peut prendre en charge. À vérifier avec votre préfecture.
							</p>
						</Card>

						<Card className="p-4">
							<h4 className="font-semibold mb-2">Q : Peux-je repasser l'examen si j'échoue ?</h4>
							<p className="text-sm text-muted-foreground">
								<strong>R :</strong> Oui, mais il faut attendre. Les délais d'accès aux nouvelles sessions varient par préfecture, estimés entre 1 et 3 mois en 2026.
							</p>
						</Card>
					</div>

					{/* SECTION 9 : OPPORTUNITÉ DE MARCHÉ */}
					<h2 className="text-2xl font-bold mt-8 mb-4">8. Le Contexte de Marché : Pourquoi la Demande Explose</h2>

					<div className="grid md:grid-cols-3 gap-4 my-6">
						<Card className="p-6 text-center">
							<div className="text-3xl font-bold text-primary mb-2">135 000+</div>
							<p className="text-sm font-semibold">Candidats par an</p>
							<p className="text-xs text-muted-foreground mt-2">Volume d'utilisateurs potentiels estimé dès 2026</p>
						</Card>
						<Card className="p-6 text-center">
							<div className="text-3xl font-bold text-orange-600 mb-2">25%+</div>
							<p className="text-sm font-semibold">Taux d'échec prévu</p>
							<p className="text-xs text-muted-foreground mt-2">Signal faible : associations signalent cette semaine un volume massif de demandes de soutien</p>
						</Card>
						<Card className="p-6 text-center">
							<div className="text-3xl font-bold text-green-600 mb-2">200-400 €</div>
							<p className="text-sm font-semibold">Tarif des cours privés</p>
							<p className="text-xs text-muted-foreground mt-2">Marché parallèle en croissance (alternative premium à l'app)</p>
						</Card>
					</div>

					<Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 my-6">
						<h3 className="font-bold mb-3 flex items-center gap-2">
							<TrendingUp className="w-5 h-5 text-blue-600" />
							Opportunité pour QCM Civique
						</h3>
						<p className="text-muted-foreground mb-3">
							La presse et les associations signalent cette semaine un "pain point" (point de douleur) massif : les candidats se sentent abandonnés face à un examen jugé "trop dur" et "pas assez préparé par l'OFII". Les cours privés (200-400 €) explosent.
						</p>
						<p className="text-sm font-semibold text-blue-700 dark:text-blue-400">
							Une application mobile, bien conçue et moins chère, représente une alternative ultra-compétitive pour une base potentielle de 135 000+ utilisateurs annuels.
						</p>
					</Card>

					{/* SECTION 10 : CONCLUSION */}
					<h2 className="text-2xl font-bold mt-8 mb-4">Conclusion : Le Nouvel Enjeu de l'Intégration en France</h2>

					<p className="mb-4">
						En publiant ces textes les 26-28 décembre, en pleine trêve, l'État français signale la fin d'une époque. L'intégration ne sera plus validée par une simple présence, mais par l'<strong>obligation de résultat</strong>. L'accès au titre de séjour pluriannuel et à la naturalisation est devenu un mérite qui se prouve par l'examen.
					</p>

					<p className="mb-6 font-semibold">
						Pour les milliers de candidats en 2026, une seule résolution s'impose : <strong>réviser, s'entraîner, et réussir du premier coup</strong>. La marge d'erreur est d'à peine 8 questions sur 40.
					</p>

					<Card className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/30 mb-8">
						<h3 className="font-bold text-lg mb-3">📱 Vous n'êtes pas Seul(e) pour Réussir</h3>
						<p className="text-muted-foreground mb-4">
							Cette semaine a confirmé : les ressources officieuses de préparation ne suffisent pas pour atteindre les 80%. Les utilisateurs demandent des simulateurs réalistes, des corrections détaillées et un suivi de progression.
						</p>
						<p className="font-semibold">
							QCM Civique a été conçu exactement pour cela : des tests en conditions réelles, calibrés sur les nouvelles questions 2026, avec des explications pédagogiques pour chaque erreur.
						</p>
					</Card>

					{/* CALL-TO-ACTION */}
					<Card className="p-8 bg-primary text-primary-foreground border-0 mb-8">
						<h3 className="text-2xl font-bold mb-3">🎯 Le Moment Critique : Les Premières Sessions Commencent Jeudi</h3>
						<p className="mb-4 text-lg">
							Ne prenez pas le risque d'échouer pour 2 points. Les places d'examen remplissent à vue d'œil dès le 2 janvier. Testez votre niveau gratuitement dès maintenant sur QCM Civique.
						</p>
						<div className="flex flex-col sm:flex-row gap-3">
						<Button asChild size="lg" variant="secondary" className="flex-1 font-bold">
							<Link to="/quiz">🚀 Commencer l'Essai Gratuit</Link>
						</Button>
							<Button asChild size="lg" variant="outline" className="flex-1 bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20">
								<Link to="/livret-citoyen">📖 Consulter le Livret du Citoyen 2026</Link>
							</Button>
						</div>
					</Card>

					<Card className="p-6 bg-muted my-8">
						<h3 className="font-bold mb-3 flex items-center gap-2">
							<Users className="w-5 h-5" />
							Partagez cette Information
						</h3>
						<p className="text-sm text-muted-foreground mb-4">
							Connaissez quelqu'un qui doit passer cet examen en 2026 ? Partagez cet article sur les réseaux sociaux. Plus tôt les gens s'entraînent, moins les déceptions seront nombreuses.
						</p>
						<div className="flex gap-2 flex-wrap">
							<Button asChild size="sm" variant="outline">
								<a href="https://linkedin.com/sharing/share-offsite/?url=https://qcmcivique.fr/blog/examen-civique-decret-2025-1345" target="_blank" rel="noopener noreferrer">
									LinkedIn
								</a>
							</Button>
							<Button asChild size="sm" variant="outline">
								<a href="https://twitter.com/intent/tweet?text=Examen%20Civique%202026%20%3A%20Les%20d%C3%A9crets%20confirment%20l%27entr%C3%A9e%20en%20vigueur%20au%201er%20janvier&url=https://qcmcivique.fr/blog/examen-civique-decret-2025-1345" target="_blank" rel="noopener noreferrer">
									Twitter
								</a>
							</Button>
							<Button asChild size="sm" variant="outline">
								<a href="https://www.facebook.com/sharer/sharer.php?u=https://qcmcivique.fr/blog/examen-civique-decret-2025-1345" target="_blank" rel="noopener noreferrer">
									Facebook
								</a>
							</Button>
						</div>
					</Card>

					{/* SOURCES & CRÉDIBILITÉ */}
					<section className="mt-12 pt-8 border-t border-border">
						<h3 className="font-bold text-lg mb-4">📚 Sources Officielles Consultées</h3>
						<ul className="space-y-2 text-sm text-muted-foreground">
							<li>• Décret n° 2025-1345 du 26 décembre 2025 (Journal Officiel du 28 décembre 2025)</li>
							<li>• Arrêtés du 22 octobre 2025 (publiés au JO du 26 décembre 2025)</li>
							<li>• Circulaire du Ministère de l'Intérieur du 27 décembre 2025 (confidentiel - résum)</li>
							<li>• Code de l'entrée et du séjour des étrangers (CESEDA) - Articles L. 413-7 et R. 413-12-1</li>
							<li>• Communiqué officiel immigration.interieur.gouv.fr</li>
						</ul>
						<p className="text-xs text-muted-foreground mt-4">
							<strong>Mise à jour :</strong> 30 décembre 2025. Cet article reflète l'état le plus récent de la législation et des directives publiques. Pour toute question juridique personnelle, consultez un avocat spécialisé en droit des étrangers.
						</p>
					</section>
				</section>

				{/* FOOTER BUTTONS */}
				<div className="flex flex-col sm:flex-row gap-4 mt-12 mb-8">
					<Button asChild size="lg" className="flex-1 font-bold">
						<Link to="/quiz">🎯 Tester le QCM Gratuitement</Link>
					</Button>
					<Button asChild variant="outline" size="lg" className="flex-1">
						<Link to="/livret-citoyen">📖 Livret du Citoyen 2026</Link>
					</Button>
					<Button asChild variant="secondary" size="lg" className="flex-1">
						<Link to="/blog">← Retour au Blog</Link>
					</Button>
				</div>
			</article>
		</UnifiedLayout>
	);
};

export default ExamenCiviqueDecret20251345;